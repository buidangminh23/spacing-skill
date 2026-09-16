import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifests = ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', '.codex-plugin/plugin.json', 'gemini-extension.json'];
const payload = ['README.md', 'LICENSE', 'CHANGELOG.md', 'LEARNINGS.md', 'skills', '.claude-plugin', '.codex-plugin', '.agents', 'gemini-extension.json'];
const readJson = (base, file) => JSON.parse(fs.readFileSync(path.join(base, file), 'utf8'));

export function releaseNotes(changelog, version) {
  const sections = [...changelog.matchAll(/^## \[([^\]]+)\][^\r\n]*\r?\n([\s\S]*?)(?=^## \[|(?![\s\S]))/gm)];
  const matches = sections.filter((entry) => entry[1] === version);
  if (matches.length !== 1 || !matches[0][2].trim()) throw new Error(`Expected one nonempty changelog entry for ${version}`);
  return matches[0][2].trim();
}

export function validate(base = root, tag) {
  const pkg = readJson(base, 'package.json');
  if (!/^\d+\.\d+\.\d+$/.test(pkg.version)) throw new Error('Use a stable major.minor.patch version');
  if (pkg.private !== true) throw new Error('This repository is not an npm package');
  if (tag && tag !== `v${pkg.version}`) throw new Error(`Tag ${tag} does not match v${pkg.version}`);
  for (const file of manifests) {
    const data = readJson(base, file);
    const version = file.endsWith('marketplace.json') ? data.plugins.find((plugin) => plugin.name === pkg.name)?.version : data.version;
    if (version !== pkg.version) throw new Error(`${file}: ${version} does not match ${pkg.version}`);
  }
  const changelog = fs.readFileSync(path.join(base, 'CHANGELOG.md'), 'utf8');
  const first = changelog.match(/^## \[([^\]]+)\]/m)?.[1];
  if (first !== pkg.version) throw new Error('Latest changelog entry must match package.json');
  const notes = releaseNotes(changelog, pkg.version);
  const skill = fs.readFileSync(path.join(base, 'skills/spacing-skill/SKILL.md'), 'utf8');
  if (!/^---\r?\nname: design-spacing-rhythm\r?\n/.test(skill)) throw new Error('Skill frontmatter is missing');
  for (const file of payload) if (!fs.existsSync(path.join(base, file))) throw new Error(`Missing release input: ${file}`);
  const gemini = readJson(base, 'gemini-extension.json');
  if (!fs.existsSync(path.join(base, gemini.contextFileName))) throw new Error('Gemini context file is missing');
  return { version: pkg.version, notes };
}

function sync() {
  const { version } = readJson(root, 'package.json');
  for (const file of manifests) {
    const data = readJson(root, file);
    if (file.endsWith('marketplace.json')) data.plugins.find((plugin) => plugin.name === 'spacing-skill').version = version;
    else data.version = version;
    fs.writeFileSync(path.join(root, file), `${JSON.stringify(data, null, 2)}\n`);
  }
}

function pack(tag) {
  const { version } = validate(root, tag);
  const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=normal'], { cwd: root, encoding: 'utf8' });
  if (dirty.trim()) throw new Error('Commit all release inputs before packaging HEAD');
  const dist = path.join(root, 'dist');
  fs.mkdirSync(dist, { recursive: true });
  const filename = `spacing-skill-v${version}.zip`;
  const archive = path.join(dist, filename);
  execFileSync('git', ['archive', '--format=zip', `--output=${archive}`, 'HEAD'], { cwd: root });
  const checksum = createHash('sha256').update(fs.readFileSync(archive)).digest('hex');
  fs.writeFileSync(path.join(dist, 'SHA256SUMS.txt'), `${checksum}  ${filename}\n`);
  process.stdout.write(`${archive}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [command = 'check', tag] = process.argv.slice(2);
    if (command === 'sync') sync();
    else if (command === 'pack') pack(tag);
    else if (command === 'notes') process.stdout.write(`${validate(root, tag).notes}\n`);
    else if (command === 'check') process.stdout.write(`Validated v${validate(root, tag).version}\n`);
    else throw new Error(`Unknown command: ${command}`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
