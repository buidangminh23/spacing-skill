import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifests = ['plugin.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', '.codex-plugin/plugin.json', 'gemini-extension.json'];
const payload = ['README.md', 'LICENSE', 'CHANGELOG.md', 'LEARNINGS.md', 'skills', '.claude-plugin', '.codex-plugin', '.agents', 'gemini-extension.json'];
const pluginPayload = ['plugin.json', 'README.md', 'LICENSE', 'skills', 'assets', '.codex-plugin'];
const readJson = (base, file) => JSON.parse(fs.readFileSync(path.join(base, file), 'utf8'));

export function pluginArchivePaths(base = root) {
  const visit = (relative) => {
    if (/(?:^|\/)(?:\.env(?:\.[^/]*)?|node_modules|connector\.json|[^/]*\.(?:pem|key))(?:\/|$)/i.test(relative)) throw new Error(`Unsafe plugin input: ${relative}`);
    const info = fs.lstatSync(path.join(base, relative));
    if (info.isSymbolicLink()) throw new Error(`Plugin payload cannot contain a symlink: ${relative}`);
    if (info.isDirectory()) {
      return fs.readdirSync(path.join(base, relative)).flatMap((name) => visit(`${relative}/${name}`));
    }
    if (!info.isFile()) throw new Error(`Unsafe plugin input: ${relative}`);
    return [relative];
  };
  return pluginPayload.flatMap(visit).sort();
}

export function releaseNotes(changelog, version) {
  const sections = [...changelog.matchAll(/^## \[([^\]]+)\][^\r\n]*\r?\n([\s\S]*?)(?=^## \[|(?![\s\S]))/gm)];
  const matches = sections.filter((entry) => entry[1] === version);
  if (matches.length !== 1 || !matches[0][2].trim()) throw new Error(`Expected one nonempty changelog entry for ${version}`);
  return matches[0][2].trim();
}

export function validate(base = root, tag) {
  const pkg = readJson(base, 'package.json');
  if (!/^\d+\.\d+\.\d+$/.test(pkg.version)) throw new Error('Use a stable major.minor.patch version');
  if (pkg.private === true || pkg.name !== '@minhspark/spacing-skill' || pkg.publishConfig?.access !== 'public') throw new Error('Expected public @minhspark/spacing-skill package');
  if (tag && tag !== `v${pkg.version}`) throw new Error(`Tag ${tag} does not match v${pkg.version}`);
  for (const file of manifests) {
    const data = readJson(base, file);
    const version = file.endsWith('marketplace.json') ? data.plugins.find((plugin) => plugin.name === 'spacing-skill')?.version : data.version;
    if (version !== pkg.version) throw new Error(`${file}: ${version} does not match ${pkg.version}`);
  }
  const portable = readJson(base, 'plugin.json');
  if (portable.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json' || portable.name !== 'spacing-skill' || portable.author?.url !== 'https://github.com/buidangminh23') throw new Error('Invalid portable plugin identity');
  const presentation = portable.extensions?.['com.openai']?.interface;
  if (!presentation?.displayName || !presentation.shortDescription || presentation.shortDescription.length > 80) throw new Error('Missing or invalid plugin presentation');
  if (presentation.category !== 'Creativity') throw new Error('Spacing Skill requires the supported public Creativity category');
  const logo = presentation.logo;
  if (typeof logo !== 'string' || !logo.startsWith('./assets/') || logo.includes('..') || !fs.existsSync(path.join(base, logo))) throw new Error('Plugin logo must be bundled inside assets');
  pluginArchivePaths(base);
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
  const pluginFilename = `spacing-skill-plugin-v${version}.zip`;
  const pluginArchive = path.join(dist, pluginFilename);
  execFileSync('git', ['archive', '--format=zip', `--output=${pluginArchive}`, 'HEAD', '--', ...pluginArchivePaths()], { cwd: root });
  const checksums = [filename, pluginFilename].map((name) => `${createHash('sha256').update(fs.readFileSync(path.join(dist, name))).digest('hex')}  ${name}`).join('\n');
  fs.writeFileSync(path.join(dist, 'SHA256SUMS.txt'), `${checksums}\n`);
  process.stdout.write(`${archive}\n${pluginArchive}\n`);
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
