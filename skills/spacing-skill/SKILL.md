---
name: design-spacing-rhythm
description: >
  Anti-cramped spacing skill for AI-generated UI. Establishes a single spacing
  scale, vertical rhythm, optical alignment, whitespace hierarchy, and density
  discipline so interfaces breathe instead of looking templated. Every rule is
  contextual — read the layout first, then apply only what fits. Not a blanket
  "add more padding" pass.
---

# spacingskill: The Spacing & Rhythm Skill

> For any UI an agent generates or edits — landing pages, dashboards, forms,
> product screens, mobile.
> Spacing is the single fastest tell of AI-generated UI: random magic numbers,
> everything equally cramped, no rhythm, optical misalignment.
> Every rule below is **contextual**. None of it fires automatically. First read
> the layout, then pull only what fits.

---

## 0. SPACE INFERENCE (Read the Layout Before Adding a Single Pixel)

Before touching padding, margins, or gaps, **infer what the layout is doing**.
Most AI spacing is bad because the model reaches for a default (`p-4` on
everything, `gap-2` between unrelated things) instead of reading relationships.

### 0.A Read these signals first
1. **Surface kind** — marketing/landing (airy), app/dashboard (dense),
   form (rhythmic), reading/editorial (vertical-rhythm-led), data table (tight).
2. **Information density the content demands** — a pricing page wants air; a
   trading terminal wants packed rows. Density follows content, not taste.
3. **Grouping** — which elements belong together vs. apart. Spacing encodes
   relationship (Section 5). Get this wrong and no amount of polish saves it.
4. **Existing system** — is there already a scale (Tailwind, design tokens, a
   CSS variable set)? Conform to it. Never introduce a second, conflicting scale.
5. **Viewport range** — spacing that works at 1440px is often cramped at 375px
   and cavernous on ultrawide. Decide the responsive behavior up front (Section 7).

### 0.B Output a one-line "Space Read" before generating
Before any code, state in one line:
**"Spacing this as: a `<surface>` at `<density 1–10>`, on a `<base>`px scale,
with `<rhythm>` vertical rhythm."**

Examples:
- *"Spacing this as: a SaaS landing at density 3, on an 8px scale, with generous
  section rhythm."*
- *"Spacing this as: an admin table at density 8, on a 4px scale, with tight
  row rhythm and airy section headers."*
- *"Spacing this as: a long-form article at density 4, on an 8px scale, with a
  1.6 line-height baseline driving all vertical spacing."*

### 0.C Anti-Default Discipline
Do **not** reach for these LLM spacing defaults:
- The same padding value on every container regardless of role.
- `gap-2` / `gap-4` everywhere with no relationship logic.
- Magic numbers (`margin-top: 13px`, `padding: 17px`) — off-scale, untraceable.
- Symmetric padding when the content is optically unbalanced (icon + label).
- Equal vertical space above and below a heading (it belongs to the content
  *below* it — see Section 4.C).
- Cramming a marketing hero at app density, or padding a data table like a hero.

---

## 1. THE THREE DIALS (Core Configuration)

After the space read, set three dials. Every spacing decision below is gated by
these. Defaults assume a general product UI; override from the space read.

* **`SPACING_STEP: 8`** — the base grid unit in px. `4` = fine control / dense
  data UI. `8` = the default; clean, predictable, divisible. Avoid odd bases.
* **`DENSITY: 4`** — `1` = art-gallery airy (marketing, hero, pricing),
  `10` = cockpit packed (tables, terminals, dashboards). Drives every gap.
* **`ALIGNMENT_RIGOR: 7`** — `1` = freeform/editorial, `10` = strict grid-locked.
  Controls how hard elements snap to columns, baselines, and optical edges.

**Baseline:** `8 / 4 / 7`. Use unless the space read overrides. Do not ask the
user to edit this file — overrides happen conversationally ("make it denser",
"this feels cramped" → drop DENSITY).

### 1.A Dial Inference (space read → dial values)
| Signal | STEP | DENSITY | RIGOR |
|---|---|---|---|
| Marketing / landing / pricing / hero | 8 | 2–3 | 6–7 |
| Editorial / blog / docs | 8 | 3–4 | 5 |
| General app / SaaS product | 8 | 4–5 | 7 |
| Dashboard / admin / settings | 4–8 | 6–7 | 8 |
| Data table / terminal / trading | 4 | 8–10 | 9 |
| Mobile-first (any) | 4–8 | +1 vs desktop | 7 |

### 1.B How DENSITY maps to the scale
DENSITY picks *which steps of the scale you reach for*, not new numbers.
- **Low (1–3):** prefer steps 6–10 (`48–128px`) for section gaps; large insets.
- **Mid (4–6):** steps 3–6 (`12–48px`) for most gaps; comfortable insets.
- **High (7–10):** steps 1–4 (`4–24px`); tight rows, compact insets, hairline gaps.

Never reach below the scale's smallest *intended* step to hit a density target —
raise the step granularity (drop `SPACING_STEP` to 4) instead.

---

## 2. THE SPACING SCALE (One Scale, No Magic Numbers)

**Rule:** every spacing value comes from a single, named scale. If a number is
not on the scale, it does not ship. This alone removes ~80% of AI spacing slop.

### 2.A The default scale (`SPACING_STEP: 8`)
A modular scale, not linear — small steps for fine control, larger jumps for
layout. This matches Tailwind's spacing scale so it drops into most projects.

| Token | px | rem | Typical use |
|---|---|---|---|
| `space-0` | 0 | 0 | reset |
| `space-1` | 4 | 0.25 | icon ↔ text, hairline gaps |
| `space-2` | 8 | 0.5 | tight inline gaps, chip padding |
| `space-3` | 12 | 0.75 | compact control padding |
| `space-4` | 16 | 1 | **default gap** between related items |
| `space-5` | 24 | 1.5 | card inset, form field spacing |
| `space-6` | 32 | 2 | group separation |
| `space-8` | 48 | 3 | sub-section spacing |
| `space-10` | 64 | 4 | section padding (block) |
| `space-12` | 96 | 6 | major section gap |
| `space-16` | 128 | 8 | hero / landing section rhythm |

### 2.B Express it as tokens, never literals
Emit CSS variables (or Tailwind classes), not raw px sprinkled through markup.

```css
:root {
  --space-1: 0.25rem; --space-2: 0.5rem;  --space-3: 0.75rem;
  --space-4: 1rem;    --space-5: 1.5rem;  --space-6: 2rem;
  --space-8: 3rem;    --space-10: 4rem;   --space-12: 6rem;
  --space-16: 8rem;
}
```

### 2.C The one allowed exception
Sub-pixel / 1px values for **borders and hairlines only** (`1px solid`).
Borders are not spacing — they live outside the scale on purpose.

---

## 3. THE SPACING PRIMITIVES (Pick the Right Tool)

Most cramped UI comes from using the wrong spacing mechanism. There are only a
few, and they are not interchangeable.

| Primitive | What it does | Use it for | Don't |
|---|---|---|---|
| **Stack** (vertical gap) | space between stacked block items | forms, lists, content flow | per-item `margin-top` chains |
| **Inline** (horizontal gap) | space between items in a row | nav, button groups, tags | `margin-right` on every child |
| **Inset** (padding) | space *inside* a container | cards, buttons, sections | faking it with inner margins |
| **Grid/flex gap** | uniform space between cells | galleries, card grids | margins that double up at edges |
| **Stack-spacer** | one variable rhythm for a region | article body, settings list | mixing 4 different gaps in one list |

### 3.A Prefer `gap` over margins
Modern layout: use `flex`/`grid` + `gap`. It is self-collapsing (no margin
doubling at edges), directional-bug-free, and trivially responsive.

```css
.stack  { display: flex; flex-direction: column; gap: var(--space-4); }
.inline { display: flex; align-items: center; gap: var(--space-2); }
.grid   { display: grid; gap: var(--space-5); grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); }
```

### 3.B One owner for spacing between two elements
A gap between A and B is owned by **one** mechanism — the parent's `gap`, OR a
margin on one side, never both and never margins on both A and B. Double-owned
spacing is the #1 source of "why is there 40px here, I only set 16px".

### 3.C Inset rhythm
Padding inside a container scales with the container's importance, not a fixed
value: chips `space-2`, buttons `space-2`/`space-4` (y/x), cards `space-5`,
sections `space-10`+. Bigger surface → bigger inset.

---

## 4. VERTICAL RHYTHM (Type Drives Spacing)

In any text-heavy surface, spacing is governed by the type, not chosen freely.

### 4.A Line-height is the base unit of vertical rhythm
Body line-height (`1.5`–`1.65` for paragraphs) sets the felt rhythm. Vertical
gaps between text blocks should be multiples that *relate* to it, so the page
reads on an invisible baseline grid.

### 4.B Spacing scales with type size
A 14px caption and a 48px display heading do not get the same margin. Space
**above** a heading grows with the heading's size; space below stays tighter.

| Element | Space above | Space below |
|---|---|---|
| H1 / display | `space-12`–`space-16` | `space-5` |
| H2 / section | `space-10` | `space-4` |
| H3 / sub | `space-8` | `space-3` |
| Paragraph | `space-4` | — (let gap own it) |
| Caption / meta | `space-2` | `space-1` |

### 4.C Headings belong to the content below them
A heading is closer to the paragraph it introduces than to the one above it
(asymmetric: more space above, less below). Equal space above and below a
heading is a classic AI tell — it visually orphans the heading.

### 4.D Don't fight line-height with padding
For single-line controls (buttons, inputs, badges), set height via line-height +
vertical inset, not a hardcoded `height` that clips descenders. Let the text box
breathe.

---

## 5. WHITESPACE HIERARCHY (Proximity = Relationship)

Space is meaning. The Law of Proximity: items closer together are read as
related; items farther apart as separate. Spacing *is* the grouping system.

### 5.A The proximity ladder
Within a region, gaps must be **clearly stepped**, not all similar:
- **Intra-item** (label ↔ its input): smallest, `space-1`–`space-2`.
- **Inter-item** (field ↔ field): medium, `space-4`–`space-5`.
- **Inter-group** (section ↔ section): large, `space-8`–`space-10`.

If intra-item and inter-group gaps are within 1.5× of each other, the hierarchy
is broken — the eye can't see the groups. Widen the larger or tighten the smaller.

### 5.B A label and its control are one unit
`space-1`/`space-2` between a label and its field. Anything more and they read as
two separate things. This is the most common form-spacing mistake.

### 5.C Don't decorate with borders what space can do
Reach for whitespace to separate before reaching for dividers, boxes, or cards.
Lines and borders are louder than space; use them only when space alone is
ambiguous (e.g., a dense table). Over-boxing is cramped *and* noisy.

---

## 6. OPTICAL ALIGNMENT (Trust the Eye, Not the Math)

Mathematically equal spacing often *looks* wrong. `ALIGNMENT_RIGOR` decides how
far you go correcting this; even at low rigor, fix the egregious cases.

### 6.A Optical centering
Triangular / asymmetric glyphs and icons (play ▶, arrows, chevrons) look
off-center when geometrically centered. Nudge them ~1–2px toward the visual
mass. Same for a single icon in a circular button.

### 6.B Icon ↔ text baseline
Align an icon to the text's optical center, not its bounding box. `align-items:
center` on the flex row plus a small size relationship (icon ≈ cap-height to
line-height of the text) reads correctly.

### 6.C Punctuation and quotes hang
Opening quotes, bullets, and list markers look indented when their box is flush.
Let them hang slightly into the margin (negative text-indent / `::marker`
tuning) so the *text* aligns, not the punctuation.

### 6.D Optical edge alignment
Align to the **visual** edge, not the bounding box: a card with a rounded
corner, a button with an icon, or italic text needs tiny compensation so a
column of elements reads as a straight edge.

### 6.E Equal gaps, unequal mass
Three cards of different content heights with equal `gap` can look unbalanced.
Equalize the *visual weight* (min-height, consistent inset) before trusting the
gap.

---

## 7. RESPONSIVE SPACING (Space Is Not Fixed)

Spacing must shrink on small screens and may grow on large ones. A fixed `96px`
section gap is a chasm on mobile and cramped nowhere.

### 7.A Fluid spacing with `clamp()`
For section-level rhythm, scale space with the viewport instead of hard
breakpoints:

```css
.section { padding-block: clamp(var(--space-8), 8vw, var(--space-16)); }
```

### 7.B Step down density on mobile
Drop one or two scale steps for layout gaps at small breakpoints; keep
intra-item gaps roughly constant (touch targets still need `space-2`+).
DENSITY effectively +1 on mobile.

### 7.C Touch targets are a spacing floor
Interactive targets ≥ 44×44px (iOS) / 48×48px (Android) with ≥ `space-2` between
adjacent targets, regardless of how dense the design is. Density never overrides
tap safety.

### 7.D Container-relative, not viewport-relative, for components
A card laid out for 1200px shouldn't keep its desktop inset inside a 320px
sidebar. Prefer container queries / relative units so a component's spacing
responds to *its* space, not the window.

---

## 8. COMPONENT-LEVEL SPACING (Recipes)

Sane defaults per component at `DENSITY 4`. Scale insets down as DENSITY rises.

- **Button:** inset `space-2` block / `space-4` inline; icon ↔ label `space-2`;
  between buttons in a group `space-3`.
- **Input / field:** inset `space-3`; label ↔ field `space-1`; field ↔ field
  `space-5`; helper/error text ↔ field `space-1`.
- **Card:** inset `space-5` (`space-6` for feature cards); title ↔ body `space-3`;
  card ↔ card in a grid `space-5`–`space-6`.
- **Nav bar:** item ↔ item `space-4`–`space-6`; logo ↔ first item `space-8`;
  vertical inset `space-3`–`space-4`.
- **List / table row:** row inset `space-2`/`space-3` (y/x) at high density;
  group header gets `space-4`+ above it.
- **Modal / dialog:** inset `space-6`; header ↔ body `space-4`; body ↔ footer
  `space-6`; footer buttons `space-3` apart.
- **Section (landing):** padding-block `space-12`–`space-16` (fluid); heading ↔
  content `space-6`–`space-8`.

---

## 9. COMMON SLOP — Spacing Anti-Patterns (Fix on Sight)

The tells that scream "an AI generated this":

1. **Uniform padding everywhere.** Same `p-4` on hero, card, nav, and footer.
2. **Off-scale magic numbers.** `13px`, `17px`, `42px` — untraceable, inconsistent.
3. **No proximity hierarchy.** Label, field, and section all `~16px` apart.
4. **Double-owned gaps.** Margin on both siblings *and* a parent gap.
5. **Symmetric heading margins.** Equal space above/below orphans the heading.
6. **Cramped touch targets.** Buttons jammed edge-to-edge on mobile.
7. **Fixed desktop spacing on mobile.** `96px` gaps crushing a 375px screen.
8. **Over-boxing.** Borders/cards doing the job whitespace should do.
9. **Optical blindness.** Geometrically-centered play icons, flush quotes.
10. **Inset that ignores surface size.** A hero with card-sized padding (or vice versa).
11. **Inconsistent gutters.** Grid gaps that vary cell-to-cell.
12. **Right-side margin hacks** (`margin-right` on each child) instead of `gap`.

---

## 10. PRE-FLIGHT CHECKLIST (Before You Ship Spacing)

Run this on the generated UI. Every "no" is a fix.

- [ ] Every spacing value is on the scale (no magic numbers)?
- [ ] One scale only — no second conflicting set of values?
- [ ] Proximity ladder visible: intra < inter-item < inter-group, clearly stepped?
- [ ] Each gap owned by exactly one mechanism (no double margins)?
- [ ] Headings spaced asymmetrically (more above, less below)?
- [ ] Insets scale with surface importance (chip < button < card < section)?
- [ ] Spacing degrades gracefully at 375px and doesn't gape at 1920px?
- [ ] Touch targets ≥ 44px with safe spacing on mobile?
- [ ] Optical fixes applied (centered glyphs, hanging punctuation, icon baseline)?
- [ ] Whitespace, not borders, doing the separating where it can?
- [ ] DENSITY consistent across sibling components of the same kind?

---

## 11. STACK-SPECIFIC NOTES

### 11.A Tailwind
The default scale above **is** Tailwind's (`p-4` = 16px, `gap-6` = 24px, …). Use
the utility steps directly; never `p-[13px]`. Extend `theme.spacing` only to add
named semantic tokens (`section`, `gutter`), not to invent off-grid numbers. Use
`space-y-*`/`gap-*` over per-child margins.

### 11.B Plain CSS / CSS Modules
Define the `--space-*` variables (Section 2.B) once at `:root` and reference them
everywhere. Use logical properties (`padding-block`, `margin-inline`) for
RTL-safety and cleaner responsive code.

### 11.C Component libraries (MUI, Chakra, shadcn)
Respect the library's existing spacing token / theme scale — do not layer a
second system on top. Map the dials to the library's spacing prop (`gap`, `p`,
`space`) rather than inline styles.

### 11.D Design tokens (Style Dictionary, Figma vars)
If the project ships tokens, those are the source of truth. Read them, conform,
and flag — don't silently introduce new spacing values that aren't in the token set.

---

> **Remember:** spacing is a *system*, not a decoration applied at the end. Read
> the layout, set the dials, pick from one scale, encode relationships with
> proximity, and let type drive vertical rhythm. When in doubt, give it room —
> but give it *measured* room.
