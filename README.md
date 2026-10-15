<div align="center">

# 📐 spacing-skill

### The Anti-Cramped Spacing Skill for AI Agents

*One scale. Real rhythm. Optical alignment. UI that breathes instead of looking templated.*

[![License: MIT](https://img.shields.io/badge/License-MIT-0078D4?style=for-the-badge)](LICENSE)
[![npm downloads](assets/badges/npm-downloads.svg)](https://www.npmjs.com/package/@minhspark/spacing-skill)
[![npm downloads / 30d](assets/badges/npm-downloads-month.svg)](https://www.npmjs.com/package/@minhspark/spacing-skill)

</div>

[Latest release](https://github.com/buidangminh23/spacing-skill/releases/latest) · [CI checks](https://github.com/buidangminh23/spacing-skill/actions/workflows/ci.yml) · [npm package](https://www.npmjs.com/package/@minhspark/spacing-skill) · [Release policy](CONTRIBUTING.md#releasing)

---

## Release notifications

To receive new release notifications, open [this repository](https://github.com/buidangminh23/spacing-skill), select **Watch → Custom → Releases**, then click **Apply**. Choose GitHub or email delivery in your [notification settings](https://github.com/settings/notifications).

Starring the repository or downloading/installing a package does not subscribe you to release notifications. Notifications do not update your installed copy; follow the installation instructions to update.

[View release notes](https://github.com/buidangminh23/spacing-skill/releases).

## Why

The fastest tell of AI-generated UI is **spacing**, not color or typography:
`p-4` on every container, `gap-2` between unrelated things, magic numbers like
`13px`, headings orphaned by symmetric margins, everything equally cramped.

`spacing-skill` gives an agent a spacing *system* — read the layout, set three
dials, pull every value from one scale, encode relationships with proximity, and
let type drive vertical rhythm. It's contextual: nothing fires automatically, so
a dashboard doesn't get marketing-hero air and a hero doesn't get table density.

---

## Install

#### ChatGPT and Codex portable plugin

Download `spacing-skill-plugin-vX.Y.Z.zip` and `SHA256SUMS.txt` from
[GitHub Releases](https://github.com/buidangminh23/spacing-skill/releases).
The plugin ZIP has `plugin.json` at its root and bundles the spacing skill and
presentation assets. It needs no external service, login, or MCP server.

For local Codex distribution, add this repository with
`codex plugin marketplace add buidangminh23/spacing-skill`, then select its
marketplace in the Plugins Directory and install Spacing Skill. Local marketplace
availability depends on the client. A GitHub release is available immediately;
installation from the universal public ChatGPT directory requires verified
developer submission and OpenAI review. This repository does not claim a public
directory listing before that review completes.

The plugin applies spacing guidance without writing a learning journal by default.
Recipients can opt into a journal in their own project. The author's historical
`LEARNINGS.md` is not needed by the plugin and is excluded from its ZIP and npm
bundle. Maintaining a fork or contributing upstream is a separate request.

#### GitHub Packages

A repository-linked copy is available as `@buidangminh23/spacing-skill` on
[GitHub Packages](https://github.com/buidangminh23/spacing-skill/packages).
The npmjs.com package remains `@minhspark/spacing-skill`.
GitHub's npm registry requires authentication with a classic token with
`read:packages` even for public packages. Authenticate locally, never commit a token:

```bash
npm login --scope=@buidangminh23 --registry=https://npm.pkg.github.com --auth-type=legacy
npm install @buidangminh23/spacing-skill --registry=https://npm.pkg.github.com
```

This downloads the bundle; use the agent-specific instructions below to register it.

#### npm package

Download the versioned bundle from [npm](https://www.npmjs.com/package/@minhspark/spacing-skill):

```bash
npm install @minhspark/spacing-skill
```

The files are installed under node_modules/@minhspark/spacing-skill. This command
does not register the skill with an agent; use the agent installation commands below
or copy the bundled skill into the agent's skill directory.

Stable downloads and release notes: [GitHub Releases](https://github.com/buidangminh23/spacing-skill/releases).
Each release includes a portable ZIP and `SHA256SUMS.txt`. Extract the ZIP to retain the native plugin directory structure.

Pick your tool. Every block below has a **copy button** (hover its top-right corner).

#### `npx` · skills

The [`skills` CLI on npm](https://www.npmjs.com/package/skills) installs and
registers this skill from GitHub. It is an alternative to downloading the npm bundle.

```bash
npx skills add buidangminh23/spacing-skill
```

#### `npx` · add-skill

```bash
npx add-skill buidangminh23/spacing-skill
```

#### Claude Code &nbsp;·&nbsp; native plugin (run inside Claude Code)

```text
/plugin marketplace add buidangminh23/spacing-skill
/plugin install spacing-skill@spacing-skill
```

#### Cursor

```bash
npx skills add buidangminh23/spacing-skill -a cursor
```

#### Codex &nbsp;·&nbsp; native marketplace

```text
codex plugin marketplace add buidangminh23/spacing-skill
```

#### Gemini CLI &nbsp;·&nbsp; native extension

```bash
gemini extensions install https://github.com/buidangminh23/spacing-skill
```

**Works with:** Claude Code · Cursor · Codex · Gemini CLI.
Skill name once loaded: **`design-spacing-rhythm`** → then prompt *"Use the spacing-rhythm skill."*

<details>
<summary><b>More options</b> — global flags, other agents (Cline, opencode…), manual install</summary>

The `skills` CLI targets any agent with `-a` and installs to the user directory with `-g`:

| Tool | Command |
|---|---|
| Claude Code | `npx skills add buidangminh23/spacing-skill -a claude-code -g` |
| Codex | `npx skills add buidangminh23/spacing-skill -a codex -g` |
| Cursor | `npx skills add buidangminh23/spacing-skill -a cursor -g` |
| Cline | `npx skills add buidangminh23/spacing-skill -a cline -g` |
| opencode | `npx skills add buidangminh23/spacing-skill -a opencode -g` |
| Several at once | `npx skills add buidangminh23/spacing-skill -a claude-code -a cursor -a codex` |

Drop `-g` for a project-local install. Manage with `npx skills list`, `npx skills update`, `npx skills remove`.

**Manual (portable)** — download the `spacing-skill-vX.Y.Z.zip` source bundle
from the [latest release](https://github.com/buidangminh23/spacing-skill/releases/latest),
extract it, and copy the complete `skills/spacing-skill/` folder to the destination
below. Keep `SKILL.md` and its sibling `references/` directory together. Fetching
only the raw `SKILL.md` omits the on-demand guidance.

| Tool | Where it goes |
|---|---|
| Claude Code | `~/.claude/skills/design-spacing-rhythm/SKILL.md` (global) or `.claude/skills/…` (project) |
| Codex | `~/.codex/skills/design-spacing-rhythm/`, or save the full folder in the repo and reference it from `AGENTS.md` |
| Cursor | keep the complete folder in the repo and reference its `SKILL.md` from an existing Cursor rule; preserve the filename so reference backlinks work |
| Cline / opencode / others | copy the full folder into the agent's skills/rules location; when pasting context, include the relevant reference contents too |

</details>

---

## Skills

| Folder | Install name | What it does |
|---|---|---|
| `skills/spacing-skill` | `design-spacing-rhythm` | Anti-cramped spacing: one scale, vertical rhythm, whitespace hierarchy, optical alignment, responsive density, accessibility floors, document & long-form (Word/Docs/PDF) spacing, and a pre-flight checklist. |

---

## Settings — The Three Dials

Every spacing decision is gated by three dials. Defaults assume a general product
UI; override them conversationally ("make it denser", "this feels cramped").

| Dial | Range | Default | Meaning |
|---|---|---|---|
| `SPACING_STEP` | 4 / 8 | **8** | Base grid unit (px). `4` for dense data UI, `8` for clean general layout. |
| `DENSITY` | 1–10 | **4** | `1` = art-gallery airy (marketing) → `10` = cockpit packed (tables/terminals). |
| `ALIGNMENT_RIGOR` | 1–10 | **7** | `1` = freeform/editorial → `10` = strict grid- and baseline-locked. |

The skill infers these from a one-line **"Space Read"** before generating any
code — e.g. *"Spacing this as: a SaaS landing at density 3, on an 8px scale, with
generous section rhythm."*

---

## What's inside the skill

16 sections, all dial-driven and contextual. The core entrypoint contains
§0–§3, §6, §11, and §13. Its reference map routes to seven focused files for
layout/type, optical alignment, responsive/accessibility, component recipes,
stack implementation, documents, and optional field learnings. Agents load only
the references needed for the task; every installation format includes them.

- **§0 Space Inference** — read signals, emit a one-line "Space Read", anti-default discipline.
- **§1 The three dials** — inference tables mapping the situation to dial values.
- **§2 One spacing scale** — px-keyed, Tailwind-aligned; primitive vs semantic tokens; modular macro tier. No magic numbers, ever.
- **§3 Primitives & gap ownership** — stack / inline / inset / grid-gap, and the single-owner law.
- **§4 Layout grid & alignment** — 12-col grid, measure (45–75ch), flex/grid alignment toolkit, subgrid for aligned card internals.
- **§5 Vertical rhythm** — type drives spacing; asymmetric heading margins; control heights from line-height + inset.
- **§6 Whitespace hierarchy** — the proximity ladder (intra < inter-item < inter-group, ≥1.5×).
- **§7 Optical alignment** — asymmetric glyph nudges, icon↔text cap-band, hanging punctuation, overshoot.
- **§8 Responsive & fluid spacing** — `clamp()`, mobile density step-down, container queries, logical properties, safe-area insets.
- **§9 Accessibility floors** — verified WCAG numbers (2.5.8 / 2.5.5 / 1.4.12 / 1.4.10), Apple 44pt / Material 48dp.
- **§10 Component recipes** — buttons, inputs, forms, cards, nav, modals, tables, chips, menus, sections, media.
- **§11 Anti-pattern catalog** — common AI spacing tells, each with the fix.
- **§12 Implementation per stack** — Tailwind, plain CSS, MUI/Chakra/Radix/shadcn, design tokens, debugging.
- **§13 Operating procedure** — 8-step pipeline, conversational override protocol, full pre-flight checklist.
- **§14 Document & long-form** — Word / Google Docs / PDF / Markdown: page margins, line spacing, the indent-vs-space rule, heading styles, print pagination, and a concept→tool mapping.
- **§15 Continuous improvement** — an optional field-learnings loop in a recipient-owned journal; source maintenance remains a separate, authorized activity.

---

## Continuous improvement

This skill can **get sharper with use** (§15) when recipients opt into a journal
in their own project. Record a Space Read, the real numbers, and a `covered` /
`gap` / `refinement` verdict only when requested. A reusable lesson can become a
proposed change to a recipient-owned fork or an authorized upstream contribution.
The installed plugin stays unchanged during ordinary use. The source repository's
historical `LEARNINGS.md` is author material, not a recipient journal or required
plugin resource.

## Release policy

Releases follow Semantic Versioning: patch for corrections, minor for compatible
skill additions, major for incompatible installation or behavior changes.
`package.json` is the version source; the skill and plugin manifests are
published to npm. See [CONTRIBUTING.md](CONTRIBUTING.md#releasing) for the full procedure.

A `vX.Y.Z` tag triggers validation on Windows, macOS, and Linux with Node 22 and
24. Every versioned manifest and the latest changelog entry must match the tag.
Only passing releases publish: notes come from that changelog entry, and the ZIP
contains the committed skill, native plugin metadata, license, and documentation.
Existing releases are verified on rerun instead of overwritten. Published tags
and assets must not be moved or replaced; corrections require a new version.

---

## Common Questions

**Does it work outside Claude Code?**
Yes. The skill folder is portable. Keep `SKILL.md` and `references/` together
in Codex, Cursor, or any agent that can load instruction files. For paste-only
tools, include the core and the references relevant to the task.

**Tailwind only?**
No. The default scale matches Tailwind so it drops in cleanly, but §12
(Implementation per stack) covers plain CSS variables, component libraries, and
design tokens.

---

<div align="center">

**MIT Licensed** · Built by [buidangminh23](https://github.com/buidangminh23)

*Give it room — but give it measured room.*

</div>
