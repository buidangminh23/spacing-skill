<div align="center">

# 📐 spacing-skill

### The Anti-Cramped Spacing Skill for AI Agents

*One scale. Real rhythm. Optical alignment. UI that breathes instead of looking templated.*

[![License: MIT](https://img.shields.io/badge/License-MIT-0078D4?style=for-the-badge)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent-Skills-E53935?style=for-the-badge)](https://github.com/buidangminh23/spacing-skill)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Plugin-FFB300?style=for-the-badge)](https://github.com/buidangminh23/spacing-skill)
[![Tools](https://img.shields.io/badge/Works_with-Claude_·_Codex_·_Cursor-43A047?style=for-the-badge)](https://github.com/buidangminh23/spacing-skill)

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

Two paths: a **universal one-liner** that works with every agent (via the
[`skills`](https://github.com/vercel-labs/skills) CLI), and a **native Claude Code
plugin**. Pick your tool below.

### ⚡ Universal — works with any agent (recommended)

The `skills` CLI drops `SKILL.md` into the correct folder for whichever agent you target.

```bash
npx skills add buidangminh23/spacing-skill
```

Target one or more tools with `-a`, install to the user directory with `-g`:

| Tool | Command |
|---|---|
| **Claude Code** | `npx skills add buidangminh23/spacing-skill -a claude-code -g` |
| **Codex CLI** | `npx skills add buidangminh23/spacing-skill -a codex -g` |
| **Cursor** | `npx skills add buidangminh23/spacing-skill -a cursor -g` |
| **Cline** | `npx skills add buidangminh23/spacing-skill -a cline -g` |
| **opencode** | `npx skills add buidangminh23/spacing-skill -a opencode -g` |
| **Multiple at once** | `npx skills add buidangminh23/spacing-skill -a claude-code -a cursor -a codex` |

Drop `-g` for a project-local install (`./<agent>/skills/`). Manage anytime with
`npx skills list`, `npx skills update`, and `npx skills remove`.

### 🟠 Claude Code — native plugin

The repo is also a Claude Code marketplace, so you can install it as a first-class
plugin and manage it from `/plugin`. Run these **inside Claude Code**:

```text
/plugin marketplace add buidangminh23/spacing-skill
/plugin install spacing-skill@spacing-skill
```

Restart the session, then prompt *"Use the spacing-rhythm skill."*

### 🔷 Codex CLI

```bash
npx skills add buidangminh23/spacing-skill -a codex -g
```

Manual alternative — fetch the file and reference it from `AGENTS.md`:

```bash
(curl -fsSL https://raw.githubusercontent.com/buidangminh23/spacing-skill/main/skills/spacing-skill/SKILL.md -o ./SKILL.md && echo "Loaded spacing-skill — see ./SKILL.md")
```

### 🟦 Cursor

```bash
npx skills add buidangminh23/spacing-skill -a cursor -g
```

Manual alternative — drop it in as a project rule:

```bash
(mkdir -p .cursor/rules && curl -fsSL https://raw.githubusercontent.com/buidangminh23/spacing-skill/main/skills/spacing-skill/SKILL.md -o .cursor/rules/spacing-skill.mdc)
```

### 📦 Manual — portable fallback (any other agent)

Fetch the instruction file once, then place it where your agent looks:

```bash
curl -fsSL https://raw.githubusercontent.com/buidangminh23/spacing-skill/main/skills/spacing-skill/SKILL.md -o SKILL.md
```

| Tool | Where it goes |
|---|---|
| **Claude Code** | `~/.claude/skills/design-spacing-rhythm/SKILL.md` (global) or `.claude/skills/…` (project) |
| **Codex** | save in repo, then reference from `AGENTS.md` (or paste into `~/.codex/AGENTS.md`) |
| **Cursor** | rename to `.cursor/rules/spacing-skill.mdc` |
| **Cline / opencode / others** | drop into the agent's skills/rules folder, or paste `SKILL.md` as context |

Skill name once loaded: **`design-spacing-rhythm`**. Pairs cleanly with
[`taste-skill`](https://github.com/Leonxlnx/taste-skill) — taste for the aesthetic,
spacing-skill for the measure.

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

- **One spacing scale** (Tailwind-compatible) — no magic numbers, ever.
- **Spacing primitives** — stack / inline / inset / gap, and which to use when.
- **Vertical rhythm** — type drives spacing; asymmetric heading margins.
- **Whitespace hierarchy** — proximity = relationship (the proximity ladder).
- **Optical alignment** — centered glyphs, hanging punctuation, icon baselines.
- **Responsive spacing** — `clamp()` fluid space, mobile density step-down, touch-target floors.
- **Component recipes** — buttons, forms, cards, nav, modals, tables.
- **Anti-pattern catalog + pre-flight checklist** — the AI spacing tells, and how to catch them.

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
