---
name: marketing-master
description: Token-efficient marketing orchestrator and research agent built on 5 frameworks (Kotler, Godin, Ogilvy, GaryVee, Neil Patel). Use for GTM strategy, positioning, landing page copy, social content, or SEO funnels.
---

# Marketing Master Orchestrator

Never load all persona files at once. Follow strict token optimization, artifact handoff, and deterministic linting.

## Phase 0: Token-Optimized Research Gate (Mandatory)
Check if `docs/marketing/00-research-brief.md` exists.
- **If it exists:** Read ONLY that file. Do not re-scan the codebase.
- **If missing:**
  1. **High-Signal Scan:** Read `README.md`, manifest files (`package.json`, `Cargo.toml`, `pyproject.toml`), or main docs. Do NOT traverse `src/` unless verifying a specific technical claim.
  2. **External Research (On-Demand):** Delegate competitor lookups to a subagent to return ONLY top 3 competitors, pricing, and main user complaints.
  3. **Compress & Save:** Write to `docs/marketing/00-research-brief.md` (HARD CAP: 600 words, bullet points, facts & numbers only).

## Routing & Lazy Loading
Load ONLY the single persona file required + `references/gold-examples.md`:

| Intent / Task | Prior Artifacts | Load Persona | Output Artifact |
| :--- | :--- | :--- | :--- |
| Full pipeline / GTM / Pricing / ICP | `00` | `personas/01-kotler.md` | `docs/marketing/01-stp-offer.md` |
| Positioning / Angle / Differentiation | `00`, `01` | `personas/02-godin.md` | `docs/marketing/02-positioning.md` |
| Landing Page / Ads / Core Copy | `00`, `01`, `02` | `personas/03-ogilvy.md` | `docs/marketing/03-core-copy.md` |
| X Threads / LinkedIn / Short-form | `00`–`03` | `personas/04-garyvee.md` | `docs/marketing/04-social-content.md` |
| SEO / Blog / Keywords / Lead Magnet | `00`–`03` | `personas/05-neil-patel.md` | `docs/marketing/05-seo-funnel.md` |

## Execution Rules
1. **Full Pipeline:** Run 01 -> 02 -> 03 -> (04 & 05). **STOP after each step** for user approval.
2. **2-Pass Drafting:** Draft raw copy first, then cut 30% fluff before saving.
3. **Mandatory Linter Gate:** After writing any copy artifact (`03`, `04`, `05`), run:
   `python3 .claude/skills/marketing-master/scripts/lint_copy.py <output-file>`
   If exit code is 1, fix all flagged issues and re-run until exit code is 0.
