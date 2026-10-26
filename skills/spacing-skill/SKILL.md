---
name: design-spacing-rhythm
description: >
  The most complete spacing & alignment skill for AI-generated UI and written documents. Reads the
  layout, sets three dials (SPACING_STEP / DENSITY / ALIGNMENT_RIGOR), derives
  ONE scale, and lets proximity carry meaning — establishing a spacing scale,
  vertical rhythm, optical alignment, whitespace hierarchy, responsive/fluid
  density, accessibility floors, component recipes, document & long-form
  (Word / Docs / PDF / Markdown) spacing, and an anti-slop checklist.
  Every rule is CONTEXTUAL: read the situation, then pull only what fits. Not a
  blanket "add more padding" pass.
---

# spacingskill: The Spacing & Rhythm Skill

> For any UI **or written document** an agent generates or edits — landing
> pages, dashboards, forms, data tables, mobile screens, editorial, and
> Word / Google Docs / PDF / Markdown documents (§14).
> Spacing is the single fastest tell of AI-generated UI: off-scale magic
> numbers, everything equally cramped, no proximity hierarchy, optical
> misalignment.
> Every rule below is **contextual**. Nothing fires automatically. First read
> the layout, set the dials, then pull only what fits. Spacing is a *system*,
> not decoration applied at the end.

---

## Load details only when relevant

Keep this core loaded. Read the applicable references before implementing that part of a task; do not load the whole directory by default. Section numbers in cross-references stay unchanged. For UI work, always read §8–§9; then load the layout, optical, recipe, and stack details the task needs. For written documents, read §14 and apply accessibility guidance relevant to the output format.

| When | Sections | Reference |
|---|---|---|
| Grid/flex alignment, type rhythm, shared baselines | §4–§5 | [Layout and type](references/layout-and-type.md) |
| Icons, brand SVGs, optical centering | §7 | [Optical alignment](references/optical-alignment.md) |
| Any UI: responsive layout, long values, targets, reflow, focus | §8–§9 | [Responsive and accessibility](references/responsive-accessibility.md) |
| Choosing component dimensions, contact cards, social rows | §10 | [Component recipes](references/component-recipes.md) |
| Implementing tokens in vanilla CSS or a framework, cascade, print | §12 | [Implementation per stack](references/implementation.md) |
| Word / Docs / PDF / Markdown layout | §14 | [Documents](references/documents.md) |
| Canonical maintainer's verified alignment edits, or recipient opt-in to journaling | §15 | [Field-learnings loop](references/field-learnings.md) |

**Accessibility floors always win:** preserve full essential text and 320 CSS px reflow; survive text-spacing overrides; keep focus visible and unclipped. Targets meet 24×24 CSS px AA or a documented exception, with 44/48 touch guidance (§9). Never trade these away for density. Keep the complete skill folder, including `references/`, when installing; copying this file alone omits the detailed guidance.

**Maintainer standing instruction:** For the owner of `buidangminh23/spacing-skill`, record each new, verified spacing or alignment method from any of their projects in that repository's `docs/LEARNINGS.md` before reporting completion. Use the existing canonical checkout or tracked submodule; distill reusable methods into the relevant reference. This standing opt-in persists across tasks; §15 keeps recipient installations separate.

---

## 0. SPACE INFERENCE — Read the Layout Before a Single Pixel

Spacing is a decision made BEFORE the first `<div>` exists. Infer it; do not
default to it. State the dials, emit one "Space Read" line, then generate.

### 0.A Signals to read (priority order — higher overrides lower)

| # | Signal | Where it comes from | What it sets |
|---|--------|---------------------|--------------|
| 1 | **Existing scale / tokens** | Tailwind config, `--space-*` / `--spacing` vars, a component lib (MUI/Carbon/Radix/Chakra), repeated literals | SPACING_STEP + the whole scale. Conform, do not invent. |
| 2 | **Brand / explicit constraint** | Brand guide, "match our app", a referenced screenshot, a stated number | Overrides aesthetic preference. Lock it, build around it. |
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
- **Compute DENSITY:** start at the **midpoint** of the §1.A range, apply the §1.B deltas (they **sum**), then **clamp to [1, 10]**. When a §1.B content shift contradicts the §1.A surface band, **content wins** (§0.A) — let the value leave the band (a marketing-hero surface holding a 9-row pricing table lands *dense*, not airy).
- `SPACING_STEP = 4` **only when** `DENSITY ≥ 7` (and as a 4-grid local override inside a dense region of an 8-grid page). The 4-scale is a strict subset of the 8-scale, so one product stays coherent.
- DENSITY and gap move **inversely**: high DENSITY pulls every gap one rung *down*; low DENSITY pushes section gaps one rung *up*.
- ALIGNMENT_RIGOR **rises with repetition** — many repeated rows/cells → 8–10; few bespoke blocks → 1–4. The `7` baseline applies only absent any repetition/bespoke signal; a present "few bespoke blocks" signal overrides it to 1–4. High DENSITY does **not** mean low RIGOR; packed UIs need *more* rigor.

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

Deltas **sum**, then clamp DENSITY to `[1, 10]`. On a content-vs-aesthetic conflict the **content** delta wins (§0.A) — "numeric/financial +1" beats "premium −1".

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

The table uses px keys; the CSS example in §2.E uses step-multiplier keys. Keep the adopted naming convention explicit. Two tiers. Primitives are the raw scale. **Semantic aliases name a job** and point at a primitive, so a density change edits one mapping, not 200 call-sites. Components consume semantic tokens; only the theme layer touches primitives.

| Semantic | Job | DENSITY 1–3 | DENSITY 4–7 | DENSITY 8–10 |
|----------|-----|:---:|:---:|:---:|
| `inset-md` | standard card/panel padding | 48 | 24–32 | 16 |
| `gutter` | column / grid-cell gap | 64 | 32–40 | 16 |
| `section` | gap between page sections | 128–160 | 96 | 48 |
| `stack-sm` | vertical gap between stacked items | 24 | 16 | 8 |

### 2.C Modular scale — only for the macro tier

For section rhythm on low-DENSITY marketing pages, a geometric scale (`stepₙ = base × ratioⁿ`) gives more deliberate jumps — **then snap each result to the nearest grid multiple.** Allowed only when `ALIGNMENT_RIGOR ≤ 4` *and* `DENSITY ≤ 4` *and* the spacing is between full page sections. At `RIGOR ≥ 7` stay linear (a baseline-locked grid can't absorb the snap residue).

Pick the ratio by DENSITY: `1.25` at DENSITY 4 (restrained) · `1.333` at 3 (editorial) · `1.5` at 2 (dramatic) · `1.618` at 1 (hero only). Example (base 16, ×1.5, snapped to 8): 16 → 24 → 40 → 56 → 80. The unsnapped 36/54/81 are forbidden.

### 2.D The ONE allowed off-scale exception

**Hairlines, borders, and rendered lines live off the spacing scale.** A `1px` border, `0.5px` retina rule, `outline-offset`, and optical-centering transform nudges (≤4px — typically 1–2px, up to 4px only for large display glyphs) are rendered lines, not layout space. The *gap around* a border is still on-scale. Nothing else escapes.

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

One axis of siblings → Stack/Inline. Container-to-content → Inset. Two-axis repetition → Grid. Inset is the **only** primitive that uses padding; Stack/Inline/Grid express *between* with `gap`. On a *wrapping* flex/grid container, one `gap` owns **both** the inline gap and the cross-axis gap between wrapped rows (`align-content` distributes leftover cross space) — chip/tag clusters wrap with even spacing from one declaration.

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

**Embedded CTA / promo cards:** classify by purpose, not by the parent column. A newsletter or subscription form after a contact-detail grid starts a separate group when it has its own heading and action. Give the parent stack an inter-group gap (e.g. detail-card gap 16 → CTA separation 32; keep at least ~1.5×, snapped to the existing ramp). The CTA owns its internal heading→description→form gaps; the parent owns the space around it. A gradient or border alone does not make every card a new tier. At the start/end of a section, use the section inset rather than adding a second outer margin.

### 6.D Macro vs micro whitespace

Micro (inside/between atoms: line-height, padding, intra/inter-item gaps, steps 4–16) drives **legibility** — get it right for usability. Macro (between sections/regions, steps 32–96+) drives **feel** — thin macro whitespace reads as cheap. They are set independently: a dense table can have tight micro spacing and generous macro margins.

### 6.E Active whitespace = emphasis

Isolation is emphasis. When something matters more, give it *more* surrounding space — a primary CTA with 2× the breathing room of its neighbors reads as primary without extra weight or color.

### 6.F Reach for whitespace BEFORE borders and boxes

Separation ladder — stop at the lightest tool that resolves the grouping: **whitespace → background tint → hairline divider (1px) → border → filled card.** A card is justified only when the surface scrolls independently, is draggable/selectable, or genuinely floats (elevation). If a card contains only spacing and no independent behavior, **delete the card and keep the spacing.** Never double-encode (a gap *and* a divider for the same break).

---

### 6.G Dark-theme optical check

Keep the same spacing ramp across light and dark themes. Bright icons, heavy text, glow, and weaker surface boundaries can make an unchanged gap look tighter on a dark surface; this is a visual check, not a mandatory dark-mode multiplier. Compare both themes at the same viewport and zoom. If a specific pair feels crowded, move only its semantic gap to the next existing rung (e.g. 8 → 12), preserve the proximity ordering, and recheck focus, contrast, and 320px reflow. If no crowding is observed, keep the geometry. Do not compensate for low contrast or oversized shadows by inflating every gap.

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
| 15 | **Tight display leading on stacked-diacritic text** (`leading-[0.95]` on Vietnamese caps) | tone marks collide between wrapped lines | floor multi-line headings at ≥1.1 for VN / Thai / Arabic / Devanagari (§5.A) |
| 16 | **Blanket one-column collapse on mobile** (`.cols-2,.cols-3,.cols-4 { 1fr }`) | a card holding one number does not need a phone's width; four of them eat a screen before any content | set columns from the narrowest cell's content demand — stat rows two-up, tables/prose full width (§8.B) |
| 17 | **Layout property written inline** (`style={{ gridTemplateColumns: … }}`) | outranks every media query, so the responsive rule exists and never fires — silently | inline sets a custom property, CSS keeps the property (§12) |
| 18 | **Fixed-width icon/logo rail** (`w-16` holding two badges) | children are `shrink-0`, so the slot overflows and paints over the next flex sibling — no clip, no scrollbar | `min-w-*` (a floor, not a clamp); measure the rail against its **fattest** row (§5.E) |
| 19 | **Centering a clamped text box** (`items-center` on a lockup whose name wraps) | the item is clamped to the container, so the centered box is wider than its ink and the group drifts toward the leading edge — worse the wider the viewport | make the wrap deterministic so `max-content` = the longest line, then center (§4.E) |
| 20 | **Unlayered critical CSS beside a layered design system** (a bare `<style>` holding `input{font:inherit}`) | layer order is settled before specificity, so the plain selector beats every `@layer utilities` class — the class is on the element, the rule is in the sheet, and the value is still wrong | wrap the block in the system's own layer: `@layer base { … }` (§12) |
| 22 | **`@page { margin: 0 }` on a multi-page document to kill the browser's print header/footer** | root padding is not per-page — left/right repeats, top/bottom lands only on the first and last sheet, so middle pages print edge-to-edge and the printer's hardware margin clips their top and bottom rows | scope the zero-margin page to single-page documents with a named `@page`, leave long reports on a real margin (§12) |
| 23 | **`margin-top:auto` as a gap in a hug-height container** (`flex:none` column, `max-content` cell) | no free space to consume, so it computes to `0` and the footer sits flush — the rule is in the sheet and the gap is not on screen | `auto` only where stretch is guaranteed; otherwise a real scale value (§4.C) |
| 24 | **Layout padded as if nothing will be drawn over it** (burnt-in caption / HUD / control bar lands on content) | `env()` does not see composited overlays, and the page looks correct right up until the frame is rendered | reserve the band: block-end padding ≥ the overlay's measured box (§8.E) |
| 21 | **Bottom-aligning a row that mixes inputs with plain text** (`margin-top:auto` on both) | the input's touch-target `min-height` makes its box ~2× taller than the one-line span, so the two texts sit at different heights even though both boxes are flush at the bottom | give every slot the same `min-height` + padding and vertically center the static ones (§4.C) |
| 25 | **Checking each width once, never the trip between them** (layout verified at 1000px and at 1680px, separately) | toolkits keep what they measured while narrow, so after widening rows stay tall, toolbars stay wrapped and fill ratios stay skewed — every single-width check still passes | re-measure every item once the width settles, off-screen rows included, and test narrow → wide → narrow (§8.I) |
| 26 | **No item told to yield in a flex row** (a `flex:none` title beside a shrinkable badge, or a `min-width:0` button beside a long label) | shrink lands on whatever can give, so the short item that carries the meaning — the plan badge, the button label — collapses or clips while the long text stays whole | the long, tail-tolerant text truncates (`flex:0 1 auto; min-width:0` + ellipsis); buttons and badges are `flex:none` (§4.C) |
| 27 | **A composed caption checked in one locale and one clock** (the developer's `9:06 · GMT+7`) | its width is the sum of the widest form of each part the viewer's settings choose, so 12-hour time, a half-hour zone or English overflows the slot and the ellipsis cuts the offset or unit at the tail | measure the worst combination at the narrowest slot; split into lines by meaning before truncating (§9.D) |

**Magic-number triage:** snap `5/6/7→8`, `10–15→8/12/16`, `17–22→16`, `23–26→24`. The only sanctioned non-multiples are hairline borders (1px), 0.5px retina rules, and optical nudges ≤4px (typically 1–2px; up to 4px only for large display glyphs). Font-driven values (line-height, cap offsets, derived control insets) are computed, not magic — exempt.

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

Override deltas apply to the **current** dial value and clamp to each dial's `[1, 10]`; a later override on the same dial supersedes the earlier one.

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
- [ ] In every row that can run out of width, buttons and badges keep their size (`scrollWidth ≤ clientWidth` at the narrowest width). Only tail-tolerant text truncates (§4.C); essential addresses wrap in shrinkable tracks (§9.D).

**Responsive**
- [ ] Dials re-evaluated per breakpoint; layout reflows, never shrinks to illegible.
- [ ] No horizontal scroll at 320px; grids collapse to a stack; 2-D-scroll content isolated in its own container.
- [ ] Section/component spacing fluid via `clamp()` with a `rem` term; safe-area insets on edge-anchored UI.
- [ ] Round trip narrow → wide → narrow returns the same layout; rows, columns and controls measured while narrow are re-measured once the width settles, off-screen rows included (§8.I).
- [ ] Every no-wrap label built from data or viewer settings (counts, language, 12/24-hour clock, time zone, date order) measured at its worst combination against the slot it is given; text whose tail carries meaning splits into lines instead of truncating (§9.D).

**A11y**
- [ ] Interactive targets ≥ 24×24px (or the 24px-circle spacing exception); 44/48 on touch.
- [ ] Focus rings visible, unclipped, `outline-offset ≥ 2px`.
- [ ] Survives WCAG 1.4.12 text-spacing overrides without clipping or overlap.

**Edge cases**
- [ ] Empty / loading / overflow states keep the same rhythm (skeletons match real spacing).
- [ ] First/last items have correct outer padding (no flush-to-edge unless an intended bleed).
- [ ] RTL mirrors padding/margins (logical properties).

---
