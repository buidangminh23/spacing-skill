# Field Learnings

[Core rules and reference map](../SKILL.md). Section numbers remain stable across the skill.

## Contents

- 15. CONTINUOUS IMPROVEMENT — The Field-Learnings Loop
- 15.A When it fires
- 15.B Capture — append one entry to the recipient's chosen journal
- 15.C Distill — graduate the lesson into the brain
- 15.D Guardrails

## 15. CONTINUOUS IMPROVEMENT — The Field-Learnings Loop

For this repository's owner, the standing request makes this loop mandatory
after each new, verified spacing or alignment adjustment in any of their
projects. Use the existing canonical checkout or tracked submodule to record
what changed and how the rendered result was checked in `docs/LEARNINGS.md`
before declaring that task complete. Distill a generalizable method into the
relevant reference and record that change in `CHANGELOG.md`.
Check for an existing entry first so a follow-up correction extends the lesson
instead of creating duplicate rules. Commit and push through the repository's
normal Git workflow, and update an embedding project's submodule pointer when
applicable. This standing request does not authorize edits to another person's
installation, fork, or plugin cache.

For recipients of the distributed skill, this loop remains optional. Apply the
spacing guidance without changing the installed plugin, its cache, or the
author's repository. Capture lessons only when a recipient opts in and chooses
a writable file in their own project. The source repository's
`docs/LEARNINGS.md` is maintainer material, not a destination for recipients'
work or a runtime dependency.

### 15.A When it fires

After the owner's standing request or a recipient opt-in, an edit that creates
or changes spacing/alignment on a real artifact can provide a lesson — a `gap`,
padding, inset, grid/flex alignment, vertical rhythm, an optical nudge, or a
document's margins / leading / indents. Skip pure reading, restating a value that
is already on-scale, or a throwaway sketch.

### 15.B Capture — append one entry to the recipient's chosen journal

Use the recipient's existing journal format. Record the **Space Read** (surface · dials · the one ratio
that mattered), **what changed with the real numbers**, **what the situation
taught**, and a one-word **verdict**:

| Verdict | Means | Triggers |
|---------|-------|----------|
| `covered` | the skill already prescribed this | nothing — a confirmation |
| `gap` | the skill was silent or wrong here | a §15.C distill pass |
| `refinement` | the skill was right but too vague to act on | a §15.C distill pass |

Log only edits you actually made (ideally saw render). Never invent a lesson you
did not hit — **evidence, not vibes.**

### 15.C Distill — graduate the lesson into the brain

For a `gap` / `refinement` that generalizes past the one case, propose a contextual
rule for the relevant section (§0–§14). Change a recipient-owned fork only when
the recipient explicitly requests skill maintenance. Upstream contributions
require a separate, authorized pull request. Journaling does not authorize a
version bump, source modification, commit, push, or publication.

### 15.D Guardrails

- **One datapoint opens a `gap`; a repeated pattern hardens a default.** Don't
  rewrite a baseline off a single layout.
- **§9 accessibility floors outrank every field preference** — a learning may
  tighten a gap only down to the floor, never through it.
- **Keep the brain lean.** The recipient's chosen journal grows; a lesson earns a
  place in §0–§14 only by generalizing. Restate in place — never append a second
  rule that says the same thing.

---

> **Spacing is a system, not a set of nudges — read the layout, name the dials,
> derive one scale, and let proximity carry the meaning. Give it room — but give
> it *measured* room.**
