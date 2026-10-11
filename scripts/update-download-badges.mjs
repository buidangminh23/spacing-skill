import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const packageName = '@minhspark/spacing-skill';
const encodedPackage = encodeURIComponent(packageName);
const dayMs = 86_400_000;
const isoDay = value => new Date(value).toISOString().slice(0, 10);
const escapeXml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`npm returned HTTP ${response.status}`);
  return response.json();
}

function validatePoint(value, start, end) {
  if (value.package !== packageName || !Number.isSafeInteger(value.downloads) || value.downloads < 0
    || !/^\d{4}-\d{2}-\d{2}$/.test(value.start) || !/^\d{4}-\d{2}-\d{2}$/.test(value.end)
    || !Number.isFinite(Date.parse(value.start)) || !Number.isFinite(Date.parse(value.end))
    || (start && value.start !== start) || (end && value.end !== end)) {
    throw new Error('Invalid npm download response');
  }
  return value;
}

export async function collectDownloads(request = getJson) {
  const metadata = await request(`https://registry.npmjs.org/${encodedPackage}`);
  const created = Date.parse(metadata.time?.created);
  if (!Number.isFinite(created)) throw new Error('Missing npm package creation date');
  const month = validatePoint(await request(`https://api.npmjs.org/downloads/point/last-month/${encodedPackage}`));
  const end = Date.parse(month.end);
  if (end - Date.parse(month.start) !== 29 * dayMs) throw new Error('Expected a complete 30-day npm window');
  const start = isoDay(created);
  if (Date.parse(start) > end) throw new Error('npm lifetime window is not available');
  let total = 0;
  for (let cursor = Date.parse(start); cursor <= end; cursor += 365 * dayMs) {
    const chunkStart = isoDay(cursor);
    const chunkEnd = isoDay(Math.min(cursor + 364 * dayMs, end));
    const point = validatePoint(await request(`https://api.npmjs.org/downloads/point/${chunkStart}:${chunkEnd}/${encodedPackage}`), chunkStart, chunkEnd);
    total += point.downloads;
    if (!Number.isSafeInteger(total)) throw new Error('npm total exceeds safe integer range');
  }
  if (total < month.downloads) throw new Error('npm total is smaller than its 30-day count');
  return { total, month: month.downloads, start, end: month.end, monthStart: month.start };
}

export function renderBadge(label, count, start, end) {
  const message = count.toLocaleString('en-US');
  const labelWidth = Math.ceil([...label].length * 7.2 + 16);
  const messageWidth = Math.ceil([...message].length * 7.2 + 16);
  const width = labelWidth + messageWidth;
  const accessible = escapeXml(`${label}: ${message}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="24" viewBox="0 0 ${width} 24" role="img" aria-label="${accessible}"><title>${accessible}. ${escapeXml(start)} to ${escapeXml(end)} UTC. Source: npm downloads API.</title><rect width="${width}" height="24" rx="4" fill="#555"/><path d="M${labelWidth} 0H${width - 4}Q${width} 0 ${width} 4V20Q${width} 24 ${width - 4} 24H${labelWidth}Z" fill="#CB3837"/><g fill="#fff" font-family="DejaVu Sans Mono,monospace" font-size="12" text-anchor="middle"><text x="${labelWidth / 2}" y="16">${escapeXml(label)}</text><text x="${labelWidth + messageWidth / 2}" y="16">${message}</text></g></svg>\n`;
}

async function main() {
  const counts = await collectDownloads();
  const output = new URL('../assets/badges/', import.meta.url);
  await mkdir(output, { recursive: true });
  await writeFile(new URL('npm-downloads.svg', output), renderBadge('npm downloads', counts.total, counts.start, counts.end));
  await writeFile(new URL('npm-downloads-month.svg', output), renderBadge('npm downloads / 30d', counts.month, counts.monthStart, counts.end));
  console.log(JSON.stringify(counts));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
