# Documents

[Core rules and reference map](../SKILL.md). Section numbers remain stable across the skill.

## Contents

- 14. DOCUMENT & LONG-FORM — Word / Google Docs / PDF / Markdown
- 14.A Page setup — margins first
- 14.B Measure — the silent killer in documents
- 14.C Line spacing (leading)
- 14.D Paragraph spacing & indentation — pick ONE separator
- 14.E Heading hierarchy — use styles, space asymmetrically
- 14.F Lists, quotes, tables in prose
- 14.G Print & pagination
- 14.H Concept → tool mapping
- 14.I Document pre-flight

## 14. DOCUMENT & LONG-FORM — Word / Google Docs / PDF / Markdown

Written documents (reports, essays, papers, PDFs) obey the **same principles** — rhythm, measure, proximity, asymmetric headings — through **different controls**. There is no `gap`, `flex`, or `px`; you set page margins, paragraph spacing, line spacing, and indents in **points (pt)**, **inches/cm**, or **line-spacing multiples**. Map the dials: documents are almost always **low DENSITY** (reading is the job); `SPACING_STEP` becomes a small pt vertical rhythm (≈6pt); `ALIGNMENT_RIGOR` governs style consistency and whether body text is justified or left-aligned.

### 14.A Page setup — margins first

| Doc kind | Margins | Notes |
|---|---|---|
| Academic (APA / MLA / Chicago) | **1 in / 2.54 cm** all sides | with 1.5- or double-spaced body; required, not optional |
| Business report | 1 in top/bottom, 1–1.25 in sides | |
| Bound / double-sided print | add a **gutter** (+0.5 in) or use **mirror margins** | inner edge needs binding room |
| Dense reference / handout | 0.75 in | the floor — below this, text crowds the edge |

Choose page size by region — **A4** (210×297 mm) vs **US Letter** (8.5×11 in) — *before* writing; changing it reflows everything.

### 14.B Measure — the silent killer in documents

A 12pt body on Letter with 1 in margins is a ~6.5 in line ≈ **90–100 characters**, well past the 45–75 ideal (§4.B), so the eye loses the return sweep. Fix with one of: **wider margins** (1.25–1.5 in), **larger type**, **more leading** (double-spacing buys back readability at long measure — why academia mandates it), or **two columns**. Never ship full-width single-spaced 11pt body.

### 14.C Line spacing (leading)

The word-processor analog of CSS `line-height`, set as a multiple on the **paragraph style** — never via blank lines.

| Use | Line spacing |
|---|---|
| Body, comfortable | **1.15–1.5** (1.15 floor; 1.5 reads better) |
| Academic requirement | 1.5 or **2.0 (double)** as specified |
| Dense tables / references / footnotes | 1.0–1.08 |
| Headings (large) | 1.0–1.1 |

### 14.D Paragraph spacing & indentation — pick ONE separator

The document single-owner rule (cf. §3.A): a paragraph break is shown by **first-line indent OR space-between paragraphs — never both, never neither.**

| Style | Separator | Use |
|---|---|---|
| **Indented** | first-line indent **0.5 in / 1.27 cm**, no space after | books, essays, continuous prose |
| **Block** | space-after **6–10pt** (or one line), no indent | business, technical, reports, web |

- **Never double-press Enter** for paragraph spacing (the document `<br><br>` — off-rhythm, breaks across pages). Use *Spacing After*.
- The first paragraph after a heading takes **no indent** — it needs no separation from the heading it follows.

### 14.E Heading hierarchy — use styles, space asymmetrically

- **Use named styles** (Heading 1 / 2 / 3), not manual bold + size — styles give consistent spacing, a navigation pane, and an automatic table of contents.
- **Asymmetric spacing** (§5.C restated): *space-before > space-after*, ≈2:1, so the heading bonds to the text below (e.g. H1 24/8 pt, H2 18/6, H3 12/4).
- Enable **Keep with next** so a heading never strands at the bottom of a page.
- Size steps follow a modular ratio (§2.C): e.g. 11pt body → 14 / 18 / 24pt headings.

### 14.F Lists, quotes, tables in prose

- **Lists:** item-to-item spacing **tighter** than paragraph spacing (one group, §6); nested levels indent **one step** (0.25–0.5 in); space before/after the whole list = paragraph spacing.
- **Block quotes:** indent the block (0.5 in), optionally a touch smaller, with space above and below; don't *also* italicize the whole thing.
- **Tables / figures:** cell padding ≥ 3–6pt so text doesn't touch the rules; one paragraph of space above/below the table; caption tight to its figure, loose from the next paragraph.

### 14.G Print & pagination

Turn on **Widow/Orphan control** (no single line stranded at a page top/bottom), **Keep lines together** for short blocks, and **Page-break-before** on major sections (never fake a break with Enter). Keep a consistent header/footer distance from the edge; footnotes get a small space above the separator rule.

### 14.H Concept → tool mapping

| Concept | CSS / web | Word | Google Docs | Markdown |
|---|---|---|---|---|
| Line spacing | `line-height` | Paragraph ▸ Line Spacing | Format ▸ Line & paragraph spacing | (renderer CSS) |
| Paragraph spacing | `margin` / `gap` | Spacing Before / After | Line & paragraph spacing ▸ Custom | blank line |
| First-line indent | `text-indent` | Ruler / Paragraph ▸ Special | Ruler ▸ first-line indent | — |
| Page margins | `@page { margin }` | Layout ▸ Margins | File ▸ Page setup | — |
| Heading | `<h1>`–`<h6>` | Styles (Heading 1…) | Styles | `#` `##` `###` |
| Measure | `max-width: 65ch` | margins / columns | margins / columns | renderer width |
| Page break | `break-before` | Insert ▸ Page Break | Insert ▸ Break | — |

> **Markdown** carries no spacing of its own — rhythm comes from the renderer's CSS (§2–§5). Author clean structure (one blank line between blocks, real headings, real lists); style it downstream.

### 14.I Document pre-flight

- [ ] Margins set for page size and binding *before* writing.
- [ ] Measure 45–75 chars (widen margins / size / spacing / columns if over).
- [ ] One paragraph separator only — indent **or** space-after, never both; no double-Enter.
- [ ] Line spacing ≥ 1.15 (1.5–2.0 if required); set on the style, not by hand.
- [ ] Headings use named styles; space-before > space-after; Keep-with-next on.
- [ ] Lists / quotes / tables grouped tighter internally than the surrounding prose.
- [ ] Widow/orphan control on; major sections start with a real page break.

---
