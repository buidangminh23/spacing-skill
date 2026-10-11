import assert from 'node:assert/strict';
import { test } from 'node:test';
import { collectDownloads, renderBadge } from '../scripts/update-download-badges.mjs';

const packageName = '@minhspark/spacing-skill';
const month = { package: packageName, start: '2026-09-11', end: '2026-10-10', downloads: 676 };

test('lifetime requests cover multiple years without overlap or exceeding the API limit', async () => {
  const periods = [];
  const counts = await collectDownloads(async url => {
    if (url.includes('registry.npmjs.org')) return { time: { created: '2024-09-17T02:32:55.000Z' } };
    if (url.includes('last-month')) return month;
    const period = url.split('/point/')[1].split('/')[0];
    periods.push(period);
    const [start, end] = period.split(':');
    return { package: packageName, start, end, downloads: 1000 };
  });
  assert.deepEqual(periods, ['2024-09-17:2025-09-16', '2025-09-17:2026-09-16', '2026-09-17:2026-10-10']);
  assert.equal(counts.total, 3000);
  assert.equal(counts.month, 676);
});

test('partial windows, wrong packages and missing counts fail instead of publishing false totals', async () => {
  for (const bad of [{ ...month, start: '2026-09-12' }, { ...month, package: 'other' }, { ...month, downloads: null }]) {
    await assert.rejects(collectDownloads(async url => url.includes('registry.npmjs.org')
      ? { time: { created: '2026-09-17T00:00:00Z' } } : bad));
  }
  await assert.rejects(collectDownloads(async url => {
    if (url.includes('registry.npmjs.org')) return { time: { created: '2026-09-17T00:00:00Z' } };
    return url.includes('last-month') ? month : { ...month, start: '2026-09-18' };
  }));
});

test('badges preserve sample dimensions, grouped counts and accessible escaped labels', () => {
  const svg = renderBadge('npm downloads', 7426, '2026-09-17', '2026-10-10');
  assert.match(svg, /width="162" height="24"/);
  assert.match(svg, /npm downloads: 7,426/);
  assert.match(svg, /fill="#CB3837"/);
  assert.match(renderBadge('<&', 0, '2026-09-17', '2026-10-10'), /&lt;&amp;/);
});
