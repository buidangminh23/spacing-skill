---
name: design-spacing-rhythm
description: >
  The most complete spacing & alignment skill for AI-generated UI. Reads the
  layout, sets three dials (SPACING_STEP / DENSITY / ALIGNMENT_RIGOR), derives
  ONE scale, and lets proximity carry meaning — establishing a spacing scale,
  vertical rhythm, optical alignment, whitespace hierarchy, responsive/fluid
  density, accessibility floors, component recipes, and an anti-slop checklist.
  Every rule is CONTEXTUAL: read the situation, then pull only what fits. Not a
  blanket "add more padding" pass.
---

# spacingskill: The Spacing & Rhythm Skill

> For any UI an agent generates or edits — landing pages, dashboards, forms,
> data tables, mobile screens, editorial.
> Spacing is the single fastest tell of AI-generated UI: off-scale magic
> numbers, everything equally cramped, no proximity hierarchy, optical
> misalignment.
> Every rule below is **contextual**. Nothing fires automatically. First read
> the layout, set the dials, then pull only what fits. Spacing is a *system*,
> not decoration applied at the end.

---

## 0. SPACE INFERENCE — Read the Layout Before a Single Pixel

Spacing is a decision made BEFORE the first `<div>` exists. Infer it; do not
default to it. State the dials, emit one "Space Read" line, then generate.

### 0.A Signals to read (priority order — higher overrides lower)

| # | Signal | Where it comes from | What it sets |
|---|--------|---------------------|--------------|
| 1 | **Existing scale / tokens** | Tailwind config, `--space-*` / `--spacing` vars, a component lib (MUI/Carbon/Radix/Chakra), repeated literals | SPACING_STEP + the whole scale. Conform, do not invent. |
| 2 | **Brand / explicit constraint** | Brand guide, "match our app", a referenced screenshot, a stated number | Overrides taste. Lock it, build around it. |
| 3 | **Surface kind** | table vs hero vs form vs dashboard | DENSITY + SPACING_STEP start |
| 4 | **Density the CONTENT demands** | field count, columns, rows/screen, words/block, scan-vs-read | Final DENSITY. Content outranks aesthetic. |
| 5 | **Grouping relationships** | how many groups; nesting depth | the spacing ramp + ALIGNMENT_RIGOR |
| 6 | **Viewport range** | mobile-only, responsive, desktop-app, TV | margins/gutters + how DENSITY shifts across breakpoints |

- **Detect-and-conform is rule zero.** If a scale exists, SPACING_STEP is already decided — adopt it. Introducing a second scale beside an existing one produces `13px`/`22px` values that read as broken. This is the most damaging spacing error.
- **Content demand outranks the surface stereotype.** A "marketing page" that is really a 9-row pricing table is a *data* surface — raise DENSITY. Classify by what the content does (scan / compare / read / input), not its label.
- **Grouping is the real job.** The deliverable is almost never "more space"; it is a *correct ratio* — items in a group sit closer to each other than to the next group (§6).
- **Viewport sets margins, not the whole system.** SPACING_STEP stays constant across breakpoints; outer margin and sometimes DENSITY change. Mobile gets a smaller margin (≈16px), never zero.

### 0.B State the "Space Read" FIRST, every time

One line before any markup. It makes the inference explicit and reviewable, and locks the dials so the user can redirect in one sentence.

> **Space Read:** `<surface>` · `<airy|balanced|packed>` · STEP `<n>` · DENSITY `<n>` · RIGOR `<n>` · `<the one ratio/constraint that matters>`

| Situation | Space Read |
|-----------|------------|
| Admin table, 7 cols, 30 rows | `data-table · packed · STEP 4 · DENSITY 8 · RIGOR 9 · row rhythm 8px, columns hard-snapped, numerals right-aligned` |
| SaaS landing hero + 3 cards | `marketing-hero · airy · STEP 8 · DENSITY 2 · RIGOR 5 · section padding 96–128px, generous lead under headline` |
| Settings form, existing Tailwind | `form · balanced · STEP 4 (inherited) · DENSITY 5 · RIGOR 8 · label↔input 8px, field↔field 24px, group↔group 40px` |

If you cannot fill the final clause, you have not finished reading the situation — do not start coding.

### 0.C Anti-Default Discipline — forbidden LLM reflexes

| Forbidden default | Why it's wrong | Do instead |
|-------------------|----------------|-----------|
| **Uniform padding everywhere** | destroys grouping; reads as one flat list | apply the §6 proximity ladder — inner gap < outer gap |
| **Magic numbers** (`13`, `17`, `22px`) | on no grid; reads as broken | every value = a multiple of SPACING_STEP |
| **Mixing two scales** | cumulative drift, nothing lines up | one SPACING_STEP for the whole tree |
| **Airy by default on dense data** | wastes the screen the content needs | DENSITY follows content (0.A.4) |
| **`gap: 10px / 20px / 30px`** | base-10 ≠ the grid | snap to 8/12/16/24 |
| **Equal margin above & below a heading** | heading belongs to the content below | ~2:1 above:below (§5) |
| **Zero outer margin on mobile** | cramped, unreadable | ≥16px screen margin for text |
| **Centering everything** | no alignment spine; weak scanning | left-align body; center only hero/empty states |
| **Sub-target tap areas** | fails a11y | ≥24×24px (WCAG AA); 44pt/48dp on touch |
| **Cramming to fit "above the fold"** | breaks rhythm for a myth | hold the ramp; let content scroll |

---

## 1. THE THREE DIALS — Core Configuration

Set three dials after the Space Read. Every later decision is gated by them.

* **`SPACING_STEP`** — base grid unit (px). `4` = fine/dense data UI, `8` = default clean layout. Avoid odd bases. Every spacing value is a multiple of it (the `0.5×` half-step is the only sub-unit, for hairline/icon↔label gaps).
* **`DENSITY`** — `1` = art-gallery airy (marketing, hero) … `10` = cockpit packed (tables, terminals). It does not invent numbers; it selects *which* rungs of the scale you reach for.
* **`ALIGNMENT_RIGOR`** — `1` = freeform/editorial … `10` = strict column- & baseline-grid-locked. Governs how hard elements snap to columns, edges, and a shared text baseline. Governs snapping, **not** gap size — an airy layout can still be strictly aligned.

**Baseline (no signal): `8 / 4 / 7`.** Overrides happen **conversationally**, never by asking the user to edit this file (see §13.B).

### 1.A Dial inference (signal → dials)

| Signal in the Space Read | STEP | DENSITY | RIGOR |
|--------------------------|:---:|:---:|:---:|
| Marketing / hero / landing | 8 | 1–3 | 4–6 |
| Editorial / brand piece | 8 | 2–4 | 1–3 |
| Standard app UI / forms / settings | 8 | 4–6 | 7–8 |
| Dashboard (mixed cards + tables) | 8 (4 inside tables) | 6–8 | 8 |
| Data table / terminal / cockpit | 4 | 8–10 | 9–10 |
| Docs / long-form reading | 8 | 3–4 | 5–6 |
| Mobile primary | 8 | 4–6 | 7 |

**Inference rules:**
- `SPACING_STEP = 4` **only when** `DENSITY ≥ 7` (and as a 4-grid local override inside a dense region of an 8-grid page). The 4-scale is a strict subset of the 8-scale, so one product stays coherent.
- DENSITY and gap move **inversely**: high DENSITY pulls every gap one rung *down*; low DENSITY pushes section gaps one rung *up*.
- ALIGNMENT_RIGOR **rises with repetition** — many repeated rows/cells → 8–10; few bespoke blocks → 1–4. High DENSITY does **not** mean low RIGOR; packed UIs need *more* rigor.

### 1.B Content adjustments to DENSITY

| Observed | Shift DENSITY |
|----------|:---:|
| > 6 columns OR > 20 rows visible | +2 |
| Numeric / financial / monitoring data | +1 |
| > 8 input fields in one view | +1 |
| Primary action is *compare* / *scan* | +1 |
| Primary action is *read* (prose) | −2 |
| Single focal CTA, little else | −2 |
| "spacious / premium / calm" | −1 to −2 |
| "compact / power-user / efficient" | +1 to +2 |

---

## 2. THE SPACING SCALE — One Scale, No Magic Numbers

Every spacing value resolves to a rung on one scale derived from `SPACING_STEP`. If a number is not on the scale it is a bug — except the one hairline exception in §2.D. **8 is the default** because Material, Apple HIG, IBM Carbon, and Tailwind's effective layout steps all converge on an 8px rhythm; 8 divides cleanly at common zoom/DPR factors and keeps steps visually distinct.

### 2.A The canonical scale (`SPACING_STEP = 8`)

Keyed by px (the universal truth) with rem and the matching Tailwind utility. `px = SPACING_STEP × multiplier`. Spacing is **linear** (multiples of the step) so it tiles and nests on a grid — never a modular/fractional scale for layout (modular is for type, §5, and the macro exception in §2.C).

| px | mult | rem | Tailwind | Typical use |
|---:|:---:|:---:|:---:|-------------|
| 0 | 0 | 0 | `p-0` | reset / collapse |
| **4** | 0.5× | 0.25 | `p-1` | hairline gap, icon↔label, tightest pair |
| **8** | 1× | 0.5 | `p-2` | tight inline gap, compact vertical inset |
| **12** | 1.5× | 0.75 | `p-3` | compact control padding |
| **16** | 2× | 1 | `p-4` | **default gap between related items**, control pad-x |
| **24** | 3× | 1.5 | `p-6` | card inset, field↔field, related-group gap |
| **32** | 4× | 2 | `p-8` | group separation, large card inset |
| **48** | 6× | 3 | `p-12` | sub-section gap |
| **64** | 8× | 4 | `p-16` | section gap (compact) |
| **96** | 12× | 6 | `p-24` | major section gap (marketing) |
| **128** | 16× | 8 | `p-32` | hero vertical rhythm |
| **160** | 20× | 10 | `p-40` | airy landing rhythm (DENSITY ≤ 3) |

**For `SPACING_STEP = 4`:** halve every px — the in-between rungs (`4 / 8 / 12 / 16 / 24 / 32 …`) become load-bearing. Nothing is dropped; the dense scale is the 8-scale with finer resolution.

> **Tailwind note:** Tailwind's unit is 4px (`p-4` = 16px). The Tailwind column above is matched by **px**, not by index — always pick the utility whose px equals your target (16px → `p-4`), and never `p-[13px]`.

### 2.B Primitive vs semantic tokens

Two tiers. Primitives are the raw scale. **Semantic aliases name a job** and point at a primitive, so a density change edits one mapping, not 200 call-sites. Components consume semantic tokens; only the theme layer touches primitives.

| Semantic | Job | DENSITY 1–3 | DENSITY 4–7 | DENSITY 8–10 |
|----------|-----|:---:|:---:|:---:|
| `inset-md` | standard card/panel padding | 48 | 24–32 | 16 |
| `gutter` | column / grid-cell gap | 64 | 32–40 | 16 |
| `section` | gap between page sections | 128–160 | 96 | 48 |
| `stack-sm` | vertical gap between stacked items | 24 | 16 | 8 |

### 2.C Modular scale — only for the macro tier

For section rhythm on low-DENSITY marketing pages, a geometric scale (`stepₙ = base × ratioⁿ`) gives more deliberate jumps — **then snap each result to the nearest grid multiple.** Allowed only when `ALIGNMENT_RIGOR ≤ 4` *and* `DENSITY ≤ 4` *and* the spacing is between full page sections. At `RIGOR ≥ 7` stay linear (a baseline-locked grid can't absorb the snap residue).

Ratios: `1.25` major third (restrained) · `1.333` perfect fourth (editorial) · `1.5` perfect fifth (dramatic) · `1.618` golden (hero only). Example (base 16, ×1.5, snapped to 8): 16 → 24 → 40 → 56 → 80. The unsnapped 36/54/81 are forbidden.

### 2.D The ONE allowed off-scale exception

**Hairlines, borders, and rendered lines live off the spacing scale.** A `1px` border, `0.5px` retina rule, `outline-offset`, and optical-centering transform nudges (≤2px) are rendered lines, not layout space. The *gap around* a border is still on-scale. Nothing else escapes.

### 2.E Emitting tokens

```css
:root {
  --space-step: 8px;
  --space-1: calc(var(--space-step) * 1);   /* 8  */
  --space-2: calc(var(--space-step) * 2);   /* 16 */
  --space-3: calc(var(--space-step) * 3);   /* 24 */
  --space-4: calc(var(--space-step) * 4);   /* 32 */
  --space-8: calc(var(--space-step) * 8);   /* 64 */
  /* semantic aliases point at primitives — density edits these only */
  --inset-md: var(--space-3);
  --gutter:   var(--space-4);
  --section:  var(--space-12, 96px);
}
```

---

## 3. SPACING PRIMITIVES & GAP OWNERSHIP

Every gap expresses a *relationship*. Name the relationship → the primitive is determined.

| Primitive | Spaces | Mechanism | Use when |
|-----------|--------|-----------|----------|
| **Stack** | siblings stacked vertically | parent `flex-direction:column; gap` | form fields, list rows, sections |
| **Inline (cluster)** | siblings in a row | parent `flex; gap` (+ `align-items`) | button rows, tag clusters, toolbars |
| **Inset** | a container & its own children | `padding` on the container | inside card/button/input/section |
| **Grid-gap** | cells of a 2-D grid | `display:grid; gap` | card galleries, dashboards, matrices |

One axis of siblings → Stack/Inline. Container-to-content → Inset. Two-axis repetition → Grid. Inset is the **only** primitive that uses padding; Stack/Inline/Grid express *between* with `gap`.

### 3.A The single-owner law — one gap, one owner

**The space between two elements has exactly one owner.** Never let A's `margin-bottom` and B's `margin-top` both contribute — you get an unpredictable sum (or a surprise collapse).

- **Default everywhere: `gap` on the flex/grid parent.** Single-owner by construction; children declare zero margins. This is the highest-leverage rule in the skill.
- **Margins are a one-direction fallback** for free-flowing prose where children aren't a known set — pick `margin-block-end`-only and never deviate.
- **Inset never doubles with gap.** A card's `padding` owns edge-to-content; the grid's `gap` owns card-to-card. They meet but never sum.

```css
.stack { display: flex; flex-direction: column; gap: var(--space-2); }
.stack > * { margin: 0; }
```

If you ever compute a gap as "8 here plus 8 there = 16", you have two owners. Collapse to one.

### 3.B DENSITY selects which rungs

| DENSITY | Section gap | Card inset | Stack gap (related) | Inline gap |
|---------|:---:|:---:|:---:|:---:|
| 1–3 (airy) | 64–96 | 32–48 | 16–24 | 12–16 |
| 4–6 (default) | 32–48 | 16–24 | 12–16 | 8–12 |
| 7–10 (data/cockpit) | 16–24 | 8–12 | 4–8 | 4–8 |

At `DENSITY ≥ 8` set `SPACING_STEP = 4` so tight gaps still land on grid.

---

## 4. LAYOUT GRID & ALIGNMENT

### 4.A Column grid, gutters, page margins

Use a 12-column grid (divisible by 2/3/4/6) when content must align across rows of differing components. **Gutters and page margins are fixed per breakpoint; column widths are fluid (`%`/`fr`).** Material 3 reference: 16dp margins at compact, 24dp gutters + margins at the tablet range.

| Viewport | Columns | Gutter | Page margin |
|----------|:---:|:---:|:---:|
| Mobile (<600) | 4 | 16 | 16 |
| Tablet (600–1024) | 8 | 24 | 24 |
| Desktop (>1024) | 12 | 24–32 | `clamp`, see 4.B |

```css
.grid-12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--gutter); }
```

### 4.B Measure & content max-width

Unbounded text on wide viewports destroys readability. **Cap the measure at 45–75 characters (~66 ideal).** Use `ch` for prose so the measure holds across font sizes; center the *block* with `margin-inline:auto`, keep page margins as `padding-inline` so text never kisses the edge.

```css
.prose { width: min(100% - 2 * var(--page-margin), 65ch); margin-inline: auto; }
```

### 4.C Alignment toolkit (reach for these before any margin/`auto` hack)

| Property | Axis | Use |
|----------|------|-----|
| `justify-content` | main / inline | distribute along the row (`space-between` for logo↔nav, `space-evenly` for segmented controls) |
| `align-items` | cross | line items up across the cross axis (`baseline` for icon+text, number+label) |
| `align-content` | wrapped lines | distribute wrapped rows |
| `place-items` | both (grid) | `place-items:center` centers a single child on both axes |
| `gap` | both | the space owner (§3.A) |

- Mixed-height inline items must align to text → `align-items:baseline`, not `center`.
- Equal-height cards in a row → `align-items:stretch` + a flex-column card with `margin-top:auto` on the footer (the one sanctioned auto-margin — it pushes *within* a flex child, owns nothing between siblings).
- `ALIGNMENT_RIGOR`: at 1–3 freeform centering and optical nudges are fine; at 7–10 every edge lands on a column line and body content uses `start`/`stretch` (not `center`) so left edges lock to the grid.

### 4.D Subgrid — align nested card content across siblings

Cards with different title lengths lose internal alignment. `align-items:stretch` equalizes *height* but not internal tracks. **Subgrid fixes it** — each card adopts the row's tracks, so titles/bodies/footers align across the row regardless of text length (baseline-supported Chrome/Edge/Firefox/Safari 16+).

```css
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.cards > .card { display: grid; grid-row: span 3; grid-template-rows: subgrid; }
```

### 4.E Centering — by what you're centering

| Situation | Strategy |
|-----------|----------|
| One element, both axes | `display:grid; place-items:center` |
| One element horizontally, block flow | `margin-inline:auto` + `max-width` |
| Text within its box | `text-align:center` (text only) |
| A row of items as a group | flex parent + `justify-content:center` |

**Never center long-form body copy** (ragged edges wreck the return sweep) — center the *block*, left-align the *text*. Centering is a DENSITY 1–4 move; at higher density / `RIGOR ≥ 6`, left-align and lock to the grid.

---

## 5. VERTICAL RHYTHM — Type Drives Spacing

Vertical space is emitted *by* the text. Line-height is the atom; set type first, then let it dictate rhythm.

### 5.A Line-height is the base unit

The **line box** (computed line-height), not the font size, is what stacks: 16px × 1.5 = a 24px line box. Reason in line boxes.

| Role | line-height | Why |
|------|:---:|-----|
| Body / paragraph | **1.5–1.6** | WCAG 1.4.12 needs ≥1.5; ship 1.5 minimum |
| Long-form reading | 1.6–1.75 | longer measure needs taller leading |
| UI body / dense rows | 1.4–1.5 | tighter, never below 1.4 on wrapping text |
| Headings (large type) | 1.0–1.25 | big glyphs need less leading |
| Single-line labels/buttons | 1.0–1.2 | inset owns the height (5.E) |

Leading shrinks as size grows. DENSITY trims leading before gaps (≥7 → 1.4; ≤3 → 1.6+), but **never below 1.4 on wrapping text** regardless of DENSITY.

### 5.B Baseline grid — pragmatic, not dogmatic

Round the computed line-height to a multiple of SPACING_STEP so every line lands on the grid (16px body → **24px** line box on an 8-grid). Align line *boxes* to the grid; don't chase per-font baselines. `ALIGNMENT_RIGOR`: ≤3 tasteful multipliers, no snapping; 4–7 snap line-heights and block gaps (headings may break locally); ≥8 snap everything and insert a corrective spacer to re-sync after off-grid media (images, embeds).

### 5.C Heading spacing is ASYMMETRIC — more above, less below

A heading **belongs to the content beneath it**. Space above separates it from the previous block; space below must be smaller so it bonds to its paragraph. Equal space orphans the heading. Ratio `above ≈ 2–3× below`; both are scale multiples. Zero out the top space on a `:first-child` heading (the container's padding owns it).

| Level | font-size | above | below |
|-------|:---:|:---:|:---:|
| H1 / page title | 36–48 | **48** | 16 |
| H2 / section | 28–32 | **40** | 16 |
| H3 / subsection | 22–24 | **32** | 12 |
| H4 | 18–20 | **24** | 8 |
| H5 / eyebrow | 14–16 | **16** | 8 |

Collapse the asymmetry into one owner (heading `margin-top` + small/zero `margin-bottom`, or container gap) — never set both heading margins *and* the next paragraph's top margin.

### 5.D A paired modular TYPE scale

Type scale and spacing scale share the same `SPACING_STEP` rhythm so sizes and gaps never fight. Ratio by context: 1.333–1.5 for marketing (DENSITY ≤3), **1.25 (major third)** default, 1.2–1.125 for dense UI (≥7). Material 3's line-heights are 4-grid-friendly (body 16/24, title 22/28, headline 24/32, 28/36, 32/40, display 57/64) — anchor a 4-grid type scale to it.

### 5.E Control heights = line-height + inset, never a clamped fixed height

A button/input height is `line-height + padding + borders` — computed, not asserted. A rigid `height:36px` with centered text clips descenders (g, y, p) when font/zoom/line-height change. Use `min-height` (a floor), never `height` (a clamp).

| Control | font / lh | inset (each side) | height | grid |
|---------|:---:|:---:|:---:|:---:|
| Small | 14 / 20 | 6 | 32 | 4× |
| Medium | 14–16 / 20–24 | 8–10 | 40 | 5× |
| Large | 16 / 24 | 12 | 48 | 6× |

Inset is the density dial (≥7 → ~6px, ≤3 → 12–14px), but the **touch target must still clear 44×44px / 48×48dp** — pad the hit area, never shrink the target (§9).

---

## 6. WHITESPACE HIERARCHY — Proximity = Relationship

Whitespace is not leftover; it is the primary grouping signal. The eye groups by distance pre-attentively (~100–150ms), before reading a word. Spacing decides structure whether you control it or not.

### 6.A The Law of Proximity

Closer reads as related; farther reads as separate — distance overrides border, color, and similarity. **The signal is the *ratio between* gaps, not any absolute value.** A 12px gap means "tighter than the 24px gap beside it." Ambiguous spacing (tiers too close in size) reads as flat noise — fix by widening the larger tier, not shrinking the smaller.

### 6.B The Proximity Ladder — the core mental model

Every gap belongs to exactly one tier. Assign the tier, then pull px from the scale.

| Tier | Separates | Reads as |
|------|-----------|----------|
| **Intra-item** | parts of ONE atom (label↔input, icon↔text, number↔unit) | one indivisible unit |
| **Inter-item** | sibling atoms in a group (two fields, two rows) | distinct but related |
| **Inter-group** | whole groups / sections | separate concerns |

**Non-negotiable rule: each tier must be clearly larger than the one below — target ≥2×, never < ~1.5×.** Below 1.5× the eye can't separate the tiers. Clean ladders: `8 → 16 → 32` (each 2×) at STEP 8, `4 → 8 → 16` at STEP 4. Three tiers is usually enough; add a fourth (`→ 64`) only for full pages.

### 6.C A label + its control is ONE unit

The `label → input` gap is intra-item — the tightest tier. **Always keep `label→input` < `input→nextField`** (e.g. 8 < 16). Violating this single inequality is the most common form-spacing bug; it makes the label detach and the form fragment.

### 6.D Macro vs micro whitespace

Micro (inside/between atoms: line-height, padding, intra/inter-item gaps, steps 4–16) drives **legibility** — get it right for usability. Macro (between sections/regions, steps 32–96+) drives **feel** — thin macro whitespace reads as cheap. They are set independently: a dense table can have tight micro spacing and generous macro margins.

### 6.E Active whitespace = emphasis

Isolation is emphasis. When something matters more, give it *more* surrounding space — a primary CTA with 2× the breathing room of its neighbors reads as primary without extra weight or color.

### 6.F Reach for whitespace BEFORE borders and boxes

Separation ladder — stop at the lightest tool that resolves the grouping: **whitespace → background tint → hairline divider (1px) → border → filled card.** A card is justified only when the surface scrolls independently, is draggable/selectable, or genuinely floats (elevation). If a card contains only spacing and no independent behavior, **delete the card and keep the spacing.** Never double-encode (a gap *and* a divider for the same break).

---

## 7. OPTICAL ALIGNMENT — Trust the Eye

The eye, not the math, is the acceptance test. Metric centering is correct only for symmetric shapes; everything asymmetric needs a nudge toward visual mass. `ALIGNMENT_RIGOR` gates *how many* fixes fire — never *whether* the egregious ones do.

### 7.A Rigor gate (apply top-down until the budget runs out)

| RIGOR | Fires | Skips |
|:---:|-------|-------|
| 1–3 | lone glyph in a circular button; icon↔text vertical centering | hanging punctuation, overshoot, mass correction |
| 4–6 | + asymmetric icon nudge (play/chevron/arrow); button icon asymmetric inset; bullet/marker hang | per-icon optical sizing, sub-pixel quote hang |
| 7–10 | + hanging punctuation & quotes, overshoot tuning, equal-gap mass correction | nothing — full optical pass |

**An asymmetric mark metric-centered is a bug at any rigor** — fix it even on an art-gallery page. DENSITY scales nudge magnitude: ~1px at DENSITY ≥7 (small glyphs; over-correction reads as error), 2–4px at ≤3 (large display glyphs).

### 7.B Asymmetric glyph nudges (≈24px icon; scale `≈ round(size/16)px`, clamp 1–3)

| Mark | Direction | Nudge @24px |
|------|-----------|:---:|
| Play ▶ in a circle | right, toward the apex | +1 to +2px translateX |
| Chevron › / ‹ | toward the point | +1px |
| Caret ▾ (dropdown) | down | +1px translateY |

Do this in the artwork or a wrapper transform — **never by unbalancing the button's padding** (that breaks the touch target).

### 7.C Icon ↔ text — the most common real bug

Size an inline icon to ≈cap-height and sit it on the cap band, not the line box (a `1em` icon floats above the optical center):

```css
.inline-icon { width: 1em; height: 1em; vertical-align: -0.125em; }
```

Prefer the `cap` unit where supported; otherwise `-0.1em` to `-0.15em` is the safe default. In dense rows, baseline-lock the icon to the row's text baseline.

### 7.D Hanging punctuation, quotes, list markers (RIGOR ≥ 6)

Pull marks into the margin so the **text edge** — not the punctuation — aligns to the column. Opening quotes hang ≈0.4–0.5em; bullets use `list-style-position: outside`; numbered lists right-align numerals (tabular figures); use `hanging-punctuation: first` where supported. Failure mode: a blockquote whose visible text starts a quote-width right of the body column.

### 7.E Button optical padding — icon beside a label

Inset asymmetrically: **tighter on the icon side, looser on the label side** (a metric-equal pad crams the icon). At STEP 8 / DENSITY 4–6: `padding: 8px 16px 8px 12px` for a leading-icon button; mirror for trailing. Icon↔label gap = one step, and always tighter than the outer pad so the pair groups. Icon-only buttons return to symmetric padding.

### 7.F Overshoot & equal-gap-unequal-mass (RIGOR ≥ 7)

Round/pointed shapes must slightly exceed cap height to *look* equal (≈1–3% for a circle/dot vs an adjacent square; below 16px, snap to whole pixels). For cards of unequal content with equal gaps: equalize *visual mass* — pad the sparse card more so ink-to-space ratio matches its neighbor, adjusting by whole SPACING_STEP units. **Squint test:** misaligned mass survives blur; metric-but-balanced alignment dissolves into even gray.

---

## 8. RESPONSIVE & FLUID SPACING

Space is a function of viewport and container — resolve it with math, gate the breakpoints with the dials, and let components respond to *their* width.

### 8.A `clamp()` for fluid section rhythm

`clamp(MIN, PREFERRED, MAX)` replaces a breakpoint stack. PREFERRED carries a `vw` term so it scales; **always include a `rem` term so it survives zoom**, and snap MIN/MAX to the scale (mid-scroll interpolation off-grid is invisible).

```css
/* 48px @360 → 128px @1440, STEP 8 */
.section { padding-block: clamp(3rem, 1.33rem + 7.41vw, 8rem); }
```

| Signal | clamp band |
|--------|-----------|
| Hero / section, DENSITY 1–3 | `clamp(4rem, …, 10rem)` |
| Standard section, DENSITY 4–6 | `clamp(3rem, …, 6rem)` |
| Dense app shell, DENSITY 7–10 | `clamp(1rem, …, 2rem)` |
| Component padding | `clamp(1rem, …, 1.5rem)` — narrow band |

Keep the fluid band wide for large spaces, narrow for small ones — a 4px→40px icon gap reads as broken.

### 8.B Step DENSITY +1 on mobile — outer skeleton only

On narrow viewports, compress *layout* gaps (section/margin/gutter drop 1–2 steps) but **hold intra-item gaps and touch targets**. If a gap separates layout regions, it is compressible; if it separates parts of one comprehensible unit, it is not.

### 8.C Container queries vs viewport

A component should respond to its **container**, not the window — a card in a 320px sidebar and a 900px column differ at one viewport width. Page chrome → `@media`; everything reusable inside it → `@container` (query `inline-size` for RTL safety).

```css
.card-wrap { container-type: inline-size; }
@container (min-width: 28rem) { .card { --pad: 1.5rem; } }
```

### 8.D Logical properties

Author with `padding-block` / `padding-inline` / `margin-inline` / `inset-*`, not physical `top/right/bottom/left`. They flow with writing direction (LTR/RTL/vertical) with zero overrides and cut declarations roughly in half.

### 8.E safe-area insets

Pad against `env(safe-area-inset-*)` for edge-anchored UI (fixed headers, bottom tab bars, FABs). Requires `<meta name="viewport" content="…, viewport-fit=cover">` or insets resolve to 0. **Add to your token, never replace it:** `padding-block-end: calc(1rem + env(safe-area-inset-bottom, 0px))`.

### 8.F `vw` pitfalls

Never size spacing/type with bare `vw` (no floor/ceiling, ignores zoom) — always wrap in `clamp()` with a `rem` term. Avoid `100vw` (scrollbar overflow → use `100%`/`100dvw`); prefer `dvh`/`svh`/`lvh` over `vh` so mobile URL-bar changes don't jump the layout.

---

## 9. ACCESSIBILITY — Spacing Floors That Override Every Dial

These are floors verified against the spec, not preferences. When a dial collides with a floor, the floor wins and you clamp the dial.

### 9.A Target size

| Standard | Minimum hit area | Level |
|----------|:---:|:---:|
| WCAG 2.5.8 Target Size (Minimum) | **24×24 CSS px** | AA |
| WCAG 2.5.5 Target Size (Enhanced) | **44×44 CSS px** | AAA |
| Apple HIG | **44×44 pt** | platform |
| Material 3 / Android | **48×48 dp** | platform |

**Separate hit area from visual size** — a 16px icon + padding reaches the target: +4px → 24px (AA), +14px → 44px (AAA). DENSITY picks which floor (1–3 → 44; 4–7 → 24 AA, 44 on primary CTAs; 8–10 → 24 AA + the spacing exception) but **never** pushes a hit area below 24px.

### 9.B The 2.5.8 spacing exception — how dense UIs stay legal

A target smaller than 24×24 passes AA **if** a 24px-diameter circle centered on it does not intersect another target's circle — i.e. centers ≥24px apart, so **min edge-gap = `24 − targetSize`**.

| Undersized target | Min edge-gap | On STEP |
|---|:---:|---|
| 20×20 | **4px** | one 4-grid step |
| 16×16 | **8px** | one 8-grid step |

This is the *only* legal way to pack interactive elements tighter than 24px — why DENSITY 8–10 tables on STEP 4 work (a 20px icon-button + 4px gutter passes AA geometrically). Also exempt: inline targets in text, user-agent-styled native controls, essential presentations.

### 9.C Text spacing must survive overrides — WCAG 1.4.12

Layout must not break (no clip, overlap, or lost content) when the user applies **all four**: `line-height ≥1.5×`, paragraph spacing `≥2×` font-size, `letter-spacing ≥0.12em`, `word-spacing ≥0.16em`. → Never set fixed-px line-height or fixed-height text containers; default to `min-height` + `height:auto`; express vertical text spacing in `rem`/`em`/grid multiples so it scales with the override. Any `overflow:hidden` / `white-space:nowrap` text box is a failure risk.

### 9.D Reflow at 320px — WCAG 1.4.10

Content must work with no 2-D scrolling at 320 CSS px wide (= 1280px @400% zoom). No fixed-px widths on layout containers (use `%`/`max-width`/`minmax()`); multi-column grids collapse to one column. Exempt content (tables, images, maps, diagrams, video, toolbars) may scroll in 2D — wrap it in an `overflow:auto` container so the *page* never scrolls horizontally. RIGOR's strict columns still apply *within* a breakpoint but never exempt the collapse below it.

### 9.E Focus indicator — budget space for it

The ring is a spacing consumer. `outline-offset ≥ 2px`; reserve a gutter (width + offset, ≈4px) so the ring isn't clipped by an `overflow:hidden` ancestor or a neighbor. Never `outline:none` without an equivalent (fails 2.4.7 / 2.4.11). At high DENSITY on STEP 4, bump the focusable gutter to 8px so the ring fits.

### 9.F Spacing as cognitive-load reduction

Whitespace groups related controls and isolates unrelated ones — directly helping low-vision, cognitive, and attention-affected users. Enforce within-group ≤ ½ between-group at **every** DENSITY; even a cockpit keeps within=4 / between=8, never both equal.

---

## 10. COMPONENT SPACING RECIPES

Stated at **DENSITY 4 / SPACING_STEP 8** (baseline `8/4/7`). Every value is a step multiple. As DENSITY rises, compress in this order: **block inset → inline inset → sibling gap → icon/label gap → touch target (never).** Nav and modals lag the curve; tables lead it.

### 10.A Density reference (read first; every recipe references it)

| Gap role | D1–2 | **D4** | D6–7 | D8–10 | Floor |
|----------|:---:|:---:|:---:|:---:|:---:|
| Inner inset (block) | 24–32 | **16** | 12 | 8→4 | 4 |
| Inner inset (inline) | 28–40 | **24** | 16 | 12→8 | 8 |
| Icon ↔ label | 12 | **8** | 8 | 4 | 4 |
| Label ↔ control | 8 | **8** | 6 | 4 | 4 |
| Sibling controls in a row | 16–24 | **12** | 8 | 4 | 4 |
| Stacked fields / list rows | 24–32 | **16** | 12 | 8→4 | 4 |
| Card ↔ card (gutter) | 32–48 | **24** | 16 | 8 | 8 |
| Section padding-block | 96–160 | **64** | 40 | 24 | 24 |
| **Tap target (mobile)** | 48 | **48** | 44 | 44 | **44 hard** |

Compression curve when no row covers a case: `gap(D) ≈ baseline × 0.85^(D−4)`, snapped to the scale, clamped to the floor.

### 10.B Recipes

- **Button:** inline inset 16 (sm 12 / lg 24) ≈ 2× block inset 8–10; icon↔label 8; button↔button 12. Inline pad always > block pad (equal looks like a chip); icon-only is square. Size by inset, never `height`.
- **Input / field:** inline inset 12–16 (match sibling buttons so they align on a row); block inset 8–12 (height ≥40 desktop / 44 touch); label↔field 8; field↔field 16; helper/error↔field **4** (tight by intent — binds the message to its field). Keep `label↔field < field↔field`.
- **Form:** group related fields with 24 between groups, 16 within; section heading↔first field 16; submit↔last field 24 (detach the commit).
- **Card:** inset 16 (media-light) / 24 (content); title↔body 8; body↔action row 16; **card↔card gutter ≥ card inset** so the channel reads wider than the card's own breathing room (or cards merge into a sheet).
- **Nav bar:** treat as fixed **D2–3** regardless of body density (a cramped nav reads as broken). Item↔item 24–32; logo↔first item 32–40; height 56–64; tap targets inside still ≥44.
- **Modal / dialog:** inset 24 (mobile 16) — larger than a card; header↔body 16; body↔footer 24; footer button↔button 12; close (×) at the inset corner with a 44px hit area. Compresses last of all surfaces.
- **Table / list row:** the canonical high-DENSITY component — design at D8–10 even in a D4 app. Row block inset 12→8→4 (the primary density lever); inline inset 16→12→8; cell inset *is* the column gap; group header 16 above / 8 below (asymmetric). Below 4px block inset, switch to fixed row-height + divider rules.
- **Chips / tags:** inline inset 8–12, block 4–6; icon↔label 4–6; chip↔chip 8 (row+column equal). Already dense — ignore much of the curve, but a removable chip's × still needs a 44px touch hit.
- **Dropdown / menu:** item block inset 8–10 (height ≥36 / 44 touch), inline 12–16; icon↔label 8; label↔trailing shortcut `auto` (min 24 gap); list inset 4–8 so first/last item isn't flush.
- **Section (landing):** marketing inverts the default — live at **D1–2**. `padding-block: clamp(96px, 12vw, 200px)`; heading↔content 24–32; content↔CTA 32–48; `padding-inline: clamp(16px, 5vw, 80px)`. Section-to-section space is the biggest "premium vs cheap" signal.
- **Avatar / media:** avatar↔text 8–12; avatar-stack overlap −8 to −12; media↔caption 8; lock media with `aspect-ratio` + `object-fit:cover`, not fixed height.

---

## 11. COMMON SLOP — Anti-Patterns (Fix on Sight)

Spottable in a screenshot or diff in under three seconds. The meta-rule: **spacing must encode relationship.** Slop applies one number everywhere because it has no model of what belongs to what.

| # | The tell | Why it's slop | The fix |
|---|----------|---------------|---------|
| 1 | **Uniform padding everywhere** | no proximity hierarchy | differential ladder: intra 1 step, inter-group 2–3 steps (§6) |
| 2 | **Off-scale magic numbers** (`13/17/23px`) | untraceable to any grid | snap to nearest step: 13→12/16, 17→16, 23→24 |
| 3 | **Orphaned heading** (symmetric margins) | reads as unowned | above ≥ 2× below (§5.C) |
| 4 | **Sub-minimum touch targets** | fails WCAG 2.5.8 | ≥24×24; 44/48 on touch (§9) |
| 5 | **Double-owned gap** (child margin + parent gap) | brittle summed spacing | one owner; prefer parent `gap` (§3.A) |
| 6 | **Fixed desktop spacing on mobile** | crushes content; h-scroll | fluid inset `clamp(16px, 5vw, 64px)` |
| 7 | **Over-boxing** (a card per group) | borders do whitespace's job | whitespace first; card only for true containers (§6.F) |
| 8 | **Centering everything** | no anchor line | left-align body; center only short hero lines |
| 9 | **Cards-in-cards** | double padding stacks | flatten to one level; inner groups use spacing |
| 10 | **Per-child `margin-right`** | phantom trailing gap; breaks wrap | `flex; gap` on the parent |
| 11 | **Inconsistent gutters** (16/20/24 for one role) | no system | one gutter token per breakpoint |
| 12 | **Optical blindness** (metric-centered glyphs, flush quotes) | looks off-center | §7 |
| 13 | **Inset ignores surface size** (24px on a chip and a panel) | should scale with surface | map inset to surface tier (chip 4–8 → page 32–64) |
| 14 | **No vertical rhythm** (random prose gaps) | off the baseline cadence | gaps = step multiples (§5) |

**Magic-number triage:** snap `5/6/7→8`, `10–15→8/12/16`, `17–22→16`, `23–26→24`. The only sanctioned non-multiples are hairline borders (1px), 0.5px retina rules, and optical nudges ≤2px. Font-driven values (line-height, cap offsets) are computed, not magic — exempt.

---

## 12. IMPLEMENTATION PER STACK

The system is stack-agnostic; the expression is not. **One source of truth for spacing per project** — if a token system exists, conform; never author a second scale beside it.

| Stack | Native primitive | SPACING_STEP lever | Forbidden |
|-------|------------------|--------------------|-----------|
| Tailwind v4 | `--spacing` + `p-4`/`gap-6` | redefine `--spacing` in `@theme` | `p-[13px]`, `gap-[15px]` |
| Tailwind v3 | `theme.spacing` | `theme.extend.spacing` | arbitrary `[13px]` |
| Plain CSS | `--space-*` at `:root` | edit the ramp | hard-coded px in rules |
| MUI | `theme.spacing(n)` (factor 8) | `spacing:` factor | raw px in `sx` |
| Chakra | `space` tokens (`gap={4}`) | extend `theme.space` | string `"13px"` props |
| Radix Themes | `gap`/padding props `1–9` | `scaling` on `<Theme>` | inline overrides |
| shadcn/ui | **is Tailwind** | `--spacing` | arbitrary values |

- **Tailwind:** the default scale *is* the grid (`--spacing` = 4px). At `SPACING_STEP 8`, prefer even steps (`2,4,6,8,12`). Extend `theme.spacing` only for **named semantic tokens** (`--spacing-section`), never one-off pixels. Own spacing from the parent (`gap` / `space-y-*`), not `mt-*` on every child.
- **Plain CSS:** declare the ramp once at `:root`; use logical properties; prefer `gap` over margins.
- **Component libs:** use the theme transform (`theme.spacing(2)`, `gap={4}`, Radix `scaling`), never raw px. shadcn = Tailwind rules.
- **Design tokens as SSOT:** if `tokens.json` / Style Dictionary / Figma variables exist, import and reference — if a value isn't in the set, *add a named token*, don't inline a number. Tokens flow one direction: Figma → Style Dictionary → CSS vars / Tailwind theme → components.

**Helper primitives + debugging:**

```css
.stack  { display:flex; flex-direction:column; gap:var(--space-2); }
.inline { display:flex; align-items:center; gap:var(--space-1); flex-wrap:wrap; }
.grid-auto { display:grid; gap:var(--space-6); grid-template-columns:repeat(auto-fill,minmax(16rem,1fr)); }

* { outline: 1px solid rgba(255,0,0,.25); }   /* surface every box: spot off-scale & uneven gaps */
```

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| gap bigger than spec between siblings | double-owned (parent gap + child margin) | remove the child margin |
| inconsistent rhythm down a list | per-child `mt`/`mb` | move to container `gap` |
| value not a step multiple | arbitrary px / off-scale token | snap to nearest rung or add a token |
| collapsing/overlapping vertical margins | adjacent margin-collapse | switch to `gap` on a flex/grid parent |

---

## 13. OPERATING PROCEDURE & PRE-FLIGHT CHECKLIST

Run every UI through this loop. Steps 1–4 decide the layout; 5–7 refine; 8 gates the ship. Don't skip because it "looks simple" — the Space Read and dials take seconds.

### 13.A The pipeline

1. **Space Read** — one line (§0.B).
2. **Set the three dials** — explicit STEP / DENSITY / RIGOR (§1).
3. **Derive the one scale** — generate the ramp from STEP; bind nothing to raw px after this (§2).
4. **Lay out** — pick the primitive, apply the proximity ladder (§3, §6).
5. **Optical pass** — fix what the math got geometrically right but visually wrong (§7).
6. **Responsive pass** — re-evaluate dials per breakpoint; reflow, don't shrink (§8).
7. **A11y pass** — targets, focus, reflow, text-spacing survival (§9).
8. **Pre-flight checklist** — every box before output.

### 13.B Conversational OVERRIDE protocol

The user steers with intent words, not numbers. Map phrase → dial move, re-derive, re-render, restate the new dial line. **Never tell the user to edit a file, token, or px — you hold the dials.**

| User says | Dial move |
|-----------|-----------|
| "denser" / "tighter" / "fits more" | DENSITY +2 → gaps down a rung; if ≥7, STEP → 4 |
| "more breathing room" / "airier" / "premium" | DENSITY −2 → section gaps up a rung; STEP → 8 |
| "cleaner" / "line things up" | RIGOR +2 → lock columns + baseline |
| "looser" / "more editorial" | RIGOR −3 → allow optical placement |
| "feels cramped" (no density ask) | bump only the violated proximity rung; keep DENSITY |
| "looks random / unaligned" | raise RIGOR, snap to grid; don't touch DENSITY |

**When to ask:** proceed silently when the Space Read completes from the brief. Ask exactly **one** question only when density intent is genuinely ambiguous and would flip DENSITY by ≥3 (e.g. "marketing hero or in-app dashboard?"). Never ask what you can infer; never ask permission to apply the scale.

### 13.C Pre-flight checklist

**Scale & dials**
- [ ] Three dials stated; `SPACING_STEP=4` only if `DENSITY ≥ 7`.
- [ ] Every spacing value lands on the ramp — zero magic numbers.
- [ ] No raw px in markup that bypasses a token.

**Rhythm & proximity**
- [ ] Proximity ladder monotonic — no wide gap nested inside a narrow one; tiers differ ≥1.5× (ideally 2×).
- [ ] `label→input` < `input→nextField`.
- [ ] One `gap` per container; no per-child margin hacks, no `<br>`-as-spacer; no double-owned gaps.
- [ ] Headings asymmetric (above ≈ 2–3× below); consistent section rhythm.

**Alignment**
- [ ] Shared left edge for stacked content; columns share tracks at `RIGOR ≥ 7`; subgrid where card internals must align.
- [ ] Optical centering applied to asymmetric glyphs/caps; punctuation hangs; numeric columns right/decimal-aligned.
- [ ] Baseline grid honored where `RIGOR ≥ 8`.

**Responsive**
- [ ] Dials re-evaluated per breakpoint; layout reflows, never shrinks to illegible.
- [ ] No horizontal scroll at 320px; grids collapse to a stack; 2-D-scroll content isolated in its own container.
- [ ] Section/component spacing fluid via `clamp()` with a `rem` term; safe-area insets on edge-anchored UI.

**A11y**
- [ ] Interactive targets ≥ 24×24px (or the 24px-circle spacing exception); 44/48 on touch.
- [ ] Focus rings visible, unclipped, `outline-offset ≥ 2px`.
- [ ] Survives WCAG 1.4.12 text-spacing overrides without clipping or overlap.

**Edge cases**
- [ ] Empty / loading / overflow states keep the same rhythm (skeletons match real spacing).
- [ ] First/last items have correct outer padding (no flush-to-edge unless an intended bleed).
- [ ] RTL mirrors padding/margins (logical properties).

---

> **Spacing is a system, not a set of nudges — read the layout, name the dials,
> derive one scale, and let proximity carry the meaning. Give it room — but give
> it *measured* room.**
