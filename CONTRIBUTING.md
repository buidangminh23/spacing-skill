# Contributing

Use Node 22 or 24 and Git. The development scripts have no external dependencies.
Keep code, documentation, commit messages, and release notes in English.

## Validation

```bash
npm test
npm run check
git diff --check
```

CI runs tests, metadata validation, and archive packaging on Linux, macOS, and
Windows with Node 22 and 24. All checks must pass before releasing.

## Releasing

1. Start from a clean checkout synchronized with `origin/main`.
2. Add a dated entry at the top of `CHANGELOG.md`, describing user-visible
   changes and their reasons. Use patch for fixes, minor for compatible additions,
   and major for breaking changes. Do not duplicate version headings.
3. Bump the version without creating a tag yet:

   ```bash
   npm version minor --no-git-tag-version
   ```

   Use `patch` or `major` when appropriate. The version hook synchronizes the
   Claude plugin, Claude marketplace, Codex plugin, and Gemini extension.
   `package.json` declares the public npm package `@minhspark/spacing-skill`.
   Inspect `npm pack --dry-run` before publishing; only the skill, plugin manifests,
   user documentation, and license belong in the npm bundle.
4. Run validation, inspect the diff, and commit the intended release files.
   Push the commit to `main` using a pull request if branch protection requires it.
   Wait for all six CI jobs to pass on the exact commit being released.
5. From that clean, synchronized commit, build and inspect the archive:

   ```bash
   npm run release:pack
   ```

   Check that `dist/spacing-skill-vX.Y.Z.zip` includes the hidden plugin folders,
   the skill, and LICENSE. `dist/SHA256SUMS.txt` records its SHA-256 checksum.
6. Create an annotated tag matching the version, then push it:

   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin vX.Y.Z
   ```

The Publish workflow revalidates the tagged commit on the full CI matrix, publishes
the missing npm version using OIDC, then creates the GitHub Release with notes and
assets. Only the npm job has `id-token: write`; only the release job has repository
write permission. No persistent npm token is stored in GitHub. Confirm the workflow succeeds, download the assets,
verify SHA-256, and check the release notes and tag commit on GitHub.

For the first npm publication, authenticate and publish the tested main commit:

```bash
npm login
npm publish --access public
npm trust github @minhspark/spacing-skill --file publish.yml --repo buidangminh23/spacing-skill --allow-publish
```

The trust command requires npm 11.15 or newer and account verification. Configure
trust once before tagging; later tags publish through GitHub Actions automatically.
If the version already exists on npm, the workflow skips publication. Verify the
registry version with `npm view @minhspark/spacing-skill version`.

If a workflow fails, rerun it after diagnosing the cause. The manual Publish
workflow accepts an existing tag. Existing assets are verified, never overwritten;
a draft can be repaired and published by a rerun. Draft assets are regenerated
from the same tagged commit, uploaded, and verified before publication.
Never move a published tag or replace a public release asset. Ship a new version
for corrections. Documentation-only changes do not require a new release unless
they change installation or usage instructions delivered in the release bundle.

The first GitHub Release is `v2.12.0`, preserving the version history already
recorded in the changelog. Historical entries are not retroactively published.
