import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { releaseNotes, validate } from '../scripts/release.mjs';

test('notes select exactly one version and exclude adjacent versions', () => {
  const changelog = '# Changelog\r\n\r\n## [2.0.0] - 2026-09-16\r\n\r\n### Added\r\n- New feature.\r\n\r\n## [1.0.0]\r\n\r\n- Initial.\r\n';
  assert.equal(releaseNotes(changelog, '2.0.0'), '### Added\r\n- New feature.');
  assert.equal(releaseNotes(changelog, '1.0.0'), '- Initial.');
  assert.throws(() => releaseNotes(changelog, '3.0.0'));
  assert.throws(() => releaseNotes(changelog + '\n## [2.0.0]\nDuplicate', '2.0.0'));
  assert.throws(() => releaseNotes('## [1.0.0]\n\n', '1.0.0'));
});

test('repository versions, release inputs and changelog agree', () => {
  const { version } = validate();
  assert.equal(validate(undefined, `v${version}`).version, version);
  assert.throws(() => validate(undefined, 'v0.0.0'), /does not match/);
});

test('validation blocks individual manifest drift and invalid release versions', () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'spacing-release-'));
  try {
    for (const file of ['package.json', 'CHANGELOG.md', 'README.md', 'LICENSE', 'LEARNINGS.md', 'gemini-extension.json', '.claude-plugin', '.codex-plugin', '.agents', 'skills']) {
      fs.cpSync(new URL(`../${file}`, import.meta.url), path.join(fixture, file), { recursive: true });
    }
    for (const file of ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', '.codex-plugin/plugin.json', 'gemini-extension.json']) {
      const target = path.join(fixture, file);
      const original = fs.readFileSync(target, 'utf8');
      const data = JSON.parse(original);
      if (file.endsWith('marketplace.json')) data.plugins[0].version = '0.0.0';
      else data.version = '0.0.0';
      fs.writeFileSync(target, JSON.stringify(data));
      assert.throws(() => validate(fixture), /does not match/);
      fs.writeFileSync(target, original);
    }
    const pkgPath = path.join(fixture, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.private = true;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg));
    assert.throws(() => validate(fixture), /Expected public/);
    delete pkg.private;
    pkg.version = '2.12.0-beta.1';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg));
    assert.throws(() => validate(fixture), /stable/);
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
