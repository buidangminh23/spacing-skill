#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DAY = 86_400_000;
const NPM_RED = '#CB3837';
const VIEWS_BLUE = '#0369a1';
const isoDay = (value) => new Date(value).toISOString().slice(0, 10);
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);

export class SourceMissing extends Error {}

/**
 * A badge in the same shape as the codex-mcp-bridge analytics badges: grey label, coloured value, 20px tall.
 */
export function renderBadge(label, value, color, detail) {
  const message = Number(value).toLocaleString('en-US');
  const labelWidth = Math.ceil([...label].length * 7.2 + 16);
  const messageWidth = Math.ceil([...message].length * 7.2 + 16);
  const width = labelWidth + messageWidth;
  const accessible = `${label}: ${message}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width * 20 / 24}" height="20" viewBox="0 0 ${width} 24" role="img" aria-label="${escapeXml(accessible)}"><title>${escapeXml(`${accessible}. ${detail}`)}</title><rect width="${width}" height="24" rx="4" fill="#555"/><path d="M${labelWidth} 0H${width - 4}Q${width} 0 ${width} 4V20Q${width} 24 ${width - 4} 24H${labelWidth}Z" fill="${color}"/><g fill="#fff" font-family="DejaVu Sans Mono,monospace" font-size="12" text-anchor="middle"><text x="${labelWidth / 2}" y="16">${escapeXml(label)}</text><text x="${labelWidth + messageWidth / 2}" y="16">${message}</text></g></svg>\n`;
}

async function getJson(url, { headers = {}, fetchImpl = globalThis.fetch } = {}) {
  const response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(30_000) });
  if (response.status === 404) throw new SourceMissing(`${url} returned 404`);
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.json();
}

function point(value, name, start, end) {
  const day = /^\d{4}-\d{2}-\d{2}$/;
  if (value.package !== name || !Number.isSafeInteger(value.downloads) || value.downloads < 0 || !day.test(value.start) || !day.test(value.end)
    || (start && value.start !== start) || (end && value.end !== end)) throw new Error('Invalid npm download response');
  return value;
}

/**
 * Lifetime and last-30-day downloads from the npm downloads API. Throws SourceMissing before the first publish.
 */
export async function npmDownloads(name, options = {}) {
  const encoded = encodeURIComponent(name);
  const metadata = await getJson(`https://registry.npmjs.org/${encoded}`, options);
  const created = Date.parse(metadata.time?.created);
  if (!Number.isFinite(created)) throw new Error('npm metadata has no creation date');
  const month = point(await getJson(`https://api.npmjs.org/downloads/point/last-month/${encoded}`, options), name);
  const end = Date.parse(month.end);
  let total = 0;
  for (let cursor = Date.parse(isoDay(created)); cursor <= end; cursor += 365 * DAY) {
    const start = isoDay(cursor);
    const stop = isoDay(Math.min(cursor + 364 * DAY, end));
    total += point(await getJson(`https://api.npmjs.org/downloads/point/${start}:${stop}/${encoded}`, options), name, start, stop).downloads;
  }
  return { total, month: month.downloads, start: isoDay(created), monthStart: month.start, end: month.end };
}

/**
 * GitHub page views over the 14-day traffic window. The workflow token cannot read traffic, so this needs a token
 * with Administration read on the repository.
 */
export async function githubViews(repo, token, options = {}) {
  if (!token) throw new SourceMissing('ANALYTICS_TOKEN is not set');
  const data = await getJson(`https://api.github.com/repos/${repo}/traffic/views`, {
    ...options,
    headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28' },
  });
  if (!Number.isSafeInteger(data.count) || !Array.isArray(data.views)) throw new Error('Invalid traffic response');
  const days = data.views.map((row) => row.timestamp.slice(0, 10)).sort();
  return { count: data.count, start: days[0] ?? null, end: days.at(-1) ?? null };
}

/**
 * Write every badge whose source answered, and report the sources that did not. A missing source leaves the badge
 * already published in place.
 */
export async function buildBadges({ name, repo, token, out, sources = ['npm', 'views'], fetchImpl = globalThis.fetch }) {
  fs.mkdirSync(out, { recursive: true });
  const written = [];
  const skipped = [];
  const failed = [];
  const collect = async (source, run) => {
    if (!sources.includes(source)) return;
    try {
      await run();
    } catch (error) {
      (error instanceof SourceMissing ? skipped : failed).push(`${source}: ${error.message}`);
    }
  };
  await collect('npm', async () => {
    const npm = await npmDownloads(name, { fetchImpl });
    fs.writeFileSync(path.join(out, 'npm-downloads.svg'), renderBadge('npm downloads', npm.total, NPM_RED, `${npm.start} to ${npm.end} UTC. Source: npm downloads API.`));
    fs.writeFileSync(path.join(out, 'npm-downloads-month.svg'), renderBadge('npm downloads / 30d', npm.month, NPM_RED, `${npm.monthStart} to ${npm.end} UTC. Source: npm downloads API.`));
    written.push('npm-downloads.svg', 'npm-downloads-month.svg');
  });
  await collect('views', async () => {
    const views = await githubViews(repo, token, { fetchImpl });
    fs.writeFileSync(path.join(out, 'github-views.svg'), renderBadge('GitHub views / 14d', views.count, VIEWS_BLUE, `${views.start ?? 'n/a'} to ${views.end ?? 'n/a'} UTC. Source: GitHub traffic API.`));
    written.push('github-views.svg');
  });
  return { written, skipped, failed };
}

function repositoryOf(pkg) {
  const match = /github\.com[/:]([\w.-]+\/[\w.-]+?)(?:\.git)?$/.exec(pkg.repository?.url ?? pkg.repository ?? '');
  if (!match) throw new Error('package.json has no GitHub repository');
  return match[1];
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const out = process.argv[2];
  if (!out) {
    process.stderr.write('usage: badges.mjs <output folder>\n');
    process.exit(2);
  }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const sources = (process.env.BADGE_SOURCES || 'npm,views').split(',').map((source) => source.trim()).filter(Boolean);
  const result = await buildBadges({ name: pkg.name, repo: repositoryOf(pkg), token: process.env.ANALYTICS_TOKEN?.trim(), out: path.resolve(out), sources });
  process.stdout.write(`${JSON.stringify(result)}\n`);
  for (const line of result.skipped) process.stdout.write(`::notice::${line}; the published badge is kept\n`);
  for (const line of result.failed) process.stdout.write(`::error::${line}\n`);
  if (result.failed.length) process.exitCode = 1;
}
