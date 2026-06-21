<div align="center">

# 📐 spacing-skill

### The Anti-Cramped Spacing Skill for AI Agents

*One scale. Real rhythm. Optical alignment. UI that breathes instead of looking templated.*

[![License: MIT](https://img.shields.io/badge/License-MIT-0078D4?style=for-the-badge)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent-Skills-E53935?style=for-the-badge)](https://github.com/buidangminh23/spacing-skill)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Plugin-FFB300?style=for-the-badge)](https://github.com/buidangminh23/spacing-skill)
[![Tools](https://img.shields.io/badge/Works_with-Claude_·_Cursor_·_Codex_·_Gemini-43A047?style=for-the-badge)](https://github.com/buidangminh23/spacing-skill)

</div>

---

## Why

The fastest tell of AI-generated UI is **spacing**, not color or typography:
`p-4` on every container, `gap-2` between unrelated things, magic numbers like
`13px`, headings orphaned by symmetric margins, everything equally cramped.

`spacing-skill` gives an agent a spacing *system* — read the layout, set three
dials, pull every value from one scale, encode relationships with proximity, and
let type drive vertical rhythm. It's contextual: nothing fires automatically, so
a dashboard doesn't get marketing-hero air and a hero doesn't get table density.

Inspired by the format of [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill) — taste handles the look, **spacing-skill handles the space**.

---

## Install

Pick your tool. Every block below has a **copy button** (hover its top-right corner).

#### `npx` · skills

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

**Manual (portable)** — fetch the file once, then place it where your agent looks:

```bash
curl -fsSL https://raw.githubusercontent.com/buidangminh23/spacing-skill/main/skills/spacing-skill/SKILL.md -o SKILL.md
```

| Tool | Where it goes |
|---|---|
| Claude Code | `~/.claude/skills/design-spacing-rhythm/SKILL.md` (global) or `.claude/skills/…` (project) |
| Codex | save in repo, then reference from `AGENTS.md` |
| Cursor | rename to `.cursor/rules/spacing-skill.mdc` |
| Cline / opencode / others | drop into the agent's skills/rules folder, or paste `SKILL.md` as context |

</details>

Pairs cleanly with [`taste-skill`](https://github.com/Leonxlnx/taste-skill) — taste for the aesthetic, spacing-skill for the measure.

---

## Skills

| Folder | Install name | What it does |
|---|---|---|
| `skills/spacing-skill` | `design-spacing-rhythm` | Anti-cramped spacing: one scale, vertical rhythm, whitespace hierarchy, optical alignment, responsive density, and a pre-flight checklist. |

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

14 sections, all dial-driven and contextual:

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
- **§11 Anti-pattern catalog** — 14 AI spacing tells, each with the fix.
- **§12 Implementation per stack** — Tailwind, plain CSS, MUI/Chakra/Radix/shadcn, design tokens, debugging.
- **§13 Operating procedure** — 8-step pipeline, conversational override protocol, full pre-flight checklist.

---

## Common Questions

**Does this replace `taste-skill`?**
No — they're complementary. Taste decides the design language; spacing-skill
decides the measure within it.

**Does it work outside Claude Code?**
Yes. `SKILL.md` is a portable instruction file. Drop it into Codex, Cursor, or
any agent that can load skill/instruction files, or paste it as context.

**Tailwind only?**
No. The default scale matches Tailwind so it drops in cleanly, but Section 11
covers plain CSS variables, component libraries, and design tokens.

---

<div align="center">

**MIT Licensed** · Built by [buidangminh23](https://github.com/buidangminh23)

*Give it room — but give it measured room.*

</div>
