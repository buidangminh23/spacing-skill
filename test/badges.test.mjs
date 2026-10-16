import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildBadges, renderBadge } from '../scripts/badges.mjs';

const NAME = '@minhspark/spacing-skill';
const REPO = 'buidangminh23/spacing-skill';
const json = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });

function fakeFetch({ published = true, traffic = 200 } = {}) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    if (url.startsWith('https://registry.npmjs.org/')) return published ? json({ time: { created: '2026-10-10T00:00:00Z' } }) : json({}, 404);
    if (url.includes('/last-month/')) return json({ package: NAME, downloads: 40, start: '2026-09-17', end: '2026-10-16' });
    if (url.includes('/downloads/point/2026-10-10:2026-10-16/')) return json({ package: NAME, downloads: 52, start: '2026-10-10', end: '2026-10-16' });
    if (url.endsWith('/traffic/views')) return traffic === 200 ? json({ count: 331, views: [{ timestamp: '2026-10-03T00:00:00Z' }, { timestamp: '2026-10-16T00:00:00Z' }] }) : json({}, traffic);
    throw new Error(`unexpected ${url}`);
  };
  return { calls, fetchImpl };
}

const tempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'badges-'));

test('renders a labelled badge with a grouped number', () => {
  const svg = renderBadge('npm downloads', 8110, '#CB3837', 'detail');
  assert.match(svg, /aria-label="npm downloads: 8,110"/);
  assert.match(svg, /fill="#CB3837"/);
});

test('writes npm and views badges when both sources answer', async () => {
  const out = tempDir();
  const { calls, fetchImpl } = fakeFetch();
  const result = await buildBadges({ name: NAME, repo: REPO, token: 'secret', out, fetchImpl });
  assert.deepEqual(result, { written: ['npm-downloads.svg', 'npm-downloads-month.svg', 'github-views.svg'], skipped: [], failed: [] });
  assert.match(fs.readFileSync(path.join(out, 'npm-downloads.svg'), 'utf8'), /npm downloads: 52/);
  assert.match(fs.readFileSync(path.join(out, 'npm-downloads-month.svg'), 'utf8'), /npm downloads \/ 30d: 40/);
  assert.match(fs.readFileSync(path.join(out, 'github-views.svg'), 'utf8'), /GitHub views \/ 14d: 331/);
  assert.equal(calls.find((call) => call.url.endsWith('/traffic/views')).init.headers.authorization, 'Bearer secret');
});

test('skips without failing before the first npm publish and without a traffic token', async () => {
  const out = tempDir();
  const result = await buildBadges({ name: NAME, repo: REPO, token: undefined, out, fetchImpl: fakeFetch({ published: false }).fetchImpl });
  assert.deepEqual(result.written, []);
  assert.equal(result.skipped.length, 2);
  assert.deepEqual(result.failed, []);
  assert.deepEqual(fs.readdirSync(out), []);
});

test('reports a rejected traffic token as a failure and keeps the npm badges', async () => {
  const out = tempDir();
  const result = await buildBadges({ name: NAME, repo: REPO, token: 'expired', out, fetchImpl: fakeFetch({ traffic: 403 }).fetchImpl });
  assert.deepEqual(result.written, ['npm-downloads.svg', 'npm-downloads-month.svg']);
  assert.match(result.failed[0], /^views: .*403/);
});

test('renders only the requested sources', async () => {
  const out = tempDir();
  const { calls, fetchImpl } = fakeFetch();
  const result = await buildBadges({ name: NAME, repo: REPO, token: 'secret', out, sources: ['views'], fetchImpl });
  assert.deepEqual(result.written, ['github-views.svg']);
  assert.ok(calls.every((call) => !call.url.includes('npmjs')));
});
