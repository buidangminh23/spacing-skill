# Optical Alignment

[Core rules and reference map](../SKILL.md). Section numbers remain stable across the skill.

## Contents

- 7. OPTICAL ALIGNMENT — Trust the Eye
- 7.A Rigor gate (apply top-down until the budget runs out)
- 7.B Asymmetric glyph nudges (≈24px icon; scale `≈ round(size/16)px`, clamp 1–3)
- 7.C Icon ↔ text — the most common real bug
- 7.D Hanging punctuation, quotes, list markers (RIGOR ≥ 6)
- 7.E Button optical padding — icon beside a label
- 7.F Overshoot & equal-gap-unequal-mass (RIGOR ≥ 7)
- 7.G Brand artwork has its own viewport

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

### 7.G Brand artwork has its own viewport

A nonzero SVG `viewBox` origin is valid, not proof of overflow: `viewBox="52 31 88 88"` still describes a square. Inspect the artwork's bounds, intrinsic dimensions, `preserveAspectRatio`, wrapper size, and flex shrink before applying a nudge. Preserve the official viewBox and native fills; a monochrome `currentColor` glyph rule must not recolor a multicolor brand mark.

Give the tile a stable size from the existing ramp (e.g. 40 or 48), prevent shrink, and size the artwork inside it. For inline SVG use `preserveAspectRatio="xMidYMid meet"`; for an `<img>` use `object-fit:contain`. `display:block` removes the inline-image baseline gap. Different artwork padding can still need an optical pass (§7.A), even when the element boxes match.

```css
.brand-tile {
  inline-size: 2.5rem;
  block-size: 2.5rem;
  flex: none;
  display: grid;
  place-items: center;
}
.brand-tile > :is(svg, img) {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
}
```

Use `overflow:hidden; border-radius:inherit` on an **inner artwork wrapper only when the design intentionally clips a full-bleed tile**. Do not crop a logo to hide a sizing error or clip the focus ring of an enclosing link. Match the wrapper radius to the tile, and preserve any brand clear-space requirement.

[SVG viewport mapping](https://www.w3.org/TR/SVG2/coords.html#ViewBoxAttribute) defines the origin and aspect-ratio behavior.

---
