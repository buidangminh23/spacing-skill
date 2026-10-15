# Component Recipes

[Core rules and reference map](../SKILL.md). Section numbers remain stable across the skill.

## Contents

- 10. COMPONENT SPACING RECIPES
- 10.A Density reference (read first; every recipe references it)
- 10.B Recipes

## 10. COMPONENT SPACING RECIPES

Stated at **DENSITY 4 / SPACING_STEP 8** (baseline `8/4/7`). Every value is a step multiple. As DENSITY rises, compress in this order: **block inset → inline inset → sibling gap → icon/label gap → touch target (never).** Nav and modals lag the curve; tables lead it.

### 10.A Density reference (read first; every recipe references it)

| Gap role | D1–2 | **D4** | D6–7 | D8–10 | Floor |
|----------|:---:|:---:|:---:|:---:|:---:|
| Inner inset (block) | 24–32 | **16** | 12 | 8→4 | 4 |
| Inner inset (inline) | 24–40 | **24** | 16 | 12→8 | 8 |
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
- **Info / contact detail card:** a fixed icon tile (40–48) beside a shrinkable label/value stack; icon↔text 8, label↔value 4, card inset 16, sibling-card gap 16. Start with a readable label around 0.75rem and value 0.875–1rem, then inherit the product's type scale; uppercase is optional and muted text still needs sufficient contrast. At DENSITY ≥7, use a 28–32 icon tile, icon↔text 4, sibling gap 12–16, inset 12 on the existing fine ramp; interactive targets still keep §9 floors. Align the tile to the stack's start for multiline values. Let full addresses wrap (§9.D); never squeeze the tile or truncate essential contact data to preserve two columns. A following promo card uses the inter-group tier (§6.C).
- **Footer social links:** artwork 20–24 inside separately focusable, accessibly named links; preserve native brand fills and use `currentColor` only for monochrome glyphs (§7.G). On touch, use 44–48 minimum targets (48 fits STEP 8), with a scale-based gap such as 8–16 **between target boxes**, and 24–32 from the row to adjacent content. The visible icon gap includes the targets' internal padding: do not size the row from artwork alone. Use a wrapping flex row, let its parent own the outer gap, and keep focus rings unclipped. Never shrink targets to force the row onto one line.
- **Nav bar:** treat as fixed **D2–3** regardless of body density (a cramped nav reads as broken). Item↔item 24–32; logo↔first item 32–40; height 56–64; tap targets inside still ≥44.
- **Modal / dialog:** inset 24 (mobile 16) — larger than a card; header↔body 16; body↔footer 24; footer button↔button 12; close (×) at the inset corner with a 44px hit area. Compresses last of all surfaces.
- **Table / list row:** the canonical high-DENSITY component — design at D8–10 even in a D4 app. Row block inset 12→8→4 (the primary density lever); inline inset 16→12→8; cell inset *is* the column gap; group header 16 above / 8 below (asymmetric). Below 4px block inset, switch to fixed row-height + divider rules.
- **Settings / list row with one action:** make the **whole row** the target instead of parking a button inside it — icon tile (40) + `gap` 12 + one-line label + trailing chevron, `min-height` 64, inset 16/12. It buys ~1.7× the tap area of a button in the same row (measured 341×65 vs 279×48 at 390px), removes the icon-column alignment problem of §4.C entirely, and cuts the row to one line. The price: only **one** action per row, and any explanation longer than a clause moves to a note at the foot of the group. A row needing two actions goes back to buttons.
- **Chips / tags:** inline inset 8–12, block 4–6; icon↔label 4–6; chip↔chip 8 (row+column equal). Already dense — ignore much of the curve, but a removable chip's × still needs a 44px touch hit.
- **Dropdown / menu:** item block inset 8–10 (height ≥36 / 44 touch), inline 12–16; icon↔label 8; label↔trailing shortcut `auto` (min 24 gap); list inset 4–8 so first/last item isn't flush.
- **Section (landing):** marketing inverts the default — live at **D1–2**. `padding-block: clamp(6rem, 4rem + 8vw, 10rem)` (96→160); heading↔content 24–32; content↔CTA 32–48; `padding-inline: clamp(1rem, 0.5rem + 4vw, 4rem)` (16→64). Section-to-section space is the biggest "premium vs cheap" signal.
- **Avatar / media:** avatar↔text 8–12; avatar-stack overlap −8 to −12; media↔caption 8; lock media with `aspect-ratio` + `object-fit:cover`, not fixed height.
- **Chart / data-viz:** apply the §6 proximity ladder to data — inter-bar gap < inter-category gap (e.g. bars 4–8, categories 16–24); plot inset for axis labels 24–32; legend↔plot 16; gridline/tick density tracks DENSITY (sparse at ≤3, dense at ≥7). Negative space inside the plot is breathing room — don't fill it.

---
