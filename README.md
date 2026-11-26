# marketing-master-skill

[![npm version](https://img.shields.io/npm/v/marketing-master-skill.svg)](https://www.npmjs.com/package/marketing-master-skill)
[![npm downloads](https://img.shields.io/npm/dm/marketing-master-skill.svg)](https://www.npmjs.com/package/marketing-master-skill)
[![license](https://img.shields.io/npm/l/marketing-master-skill.svg)](./LICENSE)

Token-optimized AI marketing orchestrator for **Claude Code** and `SKILL.md`-compatible agents.

Built on 5 distinct marketing layers—**Kotler, Seth Godin, David Ogilvy, GaryVee, and Neil Patel**—with a mandatory **Phase 0 Research Gate** (hard-capped at 600 words) and a **deterministic Python anti-slop linter**.

![Marketing Master Demo](./assets/demo.gif)

## Install via npm

Published on npm as [`marketing-master-skill`](https://www.npmjs.com/package/marketing-master-skill). No global install needed, `npx` pulls the latest version.

Install into your current project (`.claude/skills/marketing-master`):
```bash
npx marketing-master-skill init
```

Or install globally (`~/.claude/skills/marketing-master`):
```bash
npx marketing-master-skill init --global
```

## Requirements

- Node.js 18 or newer (`npx` ships with npm 7+).
- Python 3, only for the linter gate. Install it as `python3` on PATH, or call `python` if that is your alias.

## Verify the install

```bash
ls .claude/skills/marketing-master      # SKILL.md, personas/, references/, scripts/
python3 .claude/skills/marketing-master/scripts/lint_copy.py examples/03-core-copy-example.md
```

The linter should print `LINT PASSED` and exit 0.

## How It Works

1. **Phase 0, research gate.** Reads `docs/marketing/00-research-brief.md` if it exists. Otherwise it scans high-signal files (`README.md`, manifests) and compresses the facts into that brief, hard-capped at 600 words.
2. **Lazy persona loading.** Loads the one persona the task needs, plus the gold examples. Never the whole set, so context stays small.
3. **Artifact handoff.** Each stage writes a numbered file under `docs/marketing/` so the next stage reads a file instead of re-scanning the repo.
4. **Linter gate.** Any copy artifact is checked by `scripts/lint_copy.py`, which flags banned slop words (`unlock`, `seamless`, `elevate`, `leverage`, and friends), more than 6 em-dashes, and sentences over 28 words. Exit code 1 means the draft needs another pass.

| Task | Persona | Output |
| :--- | :--- | :--- |
| GTM, pricing, ICP | Kotler | `docs/marketing/01-stp-offer.md` |
| Positioning, differentiation | Godin | `docs/marketing/02-positioning.md` |
| Landing page, ads, core copy | Ogilvy | `docs/marketing/03-core-copy.md` |
| X threads, LinkedIn, short-form | GaryVee | `docs/marketing/04-social-content.md` |
| SEO, blog, lead magnet | Neil Patel | `docs/marketing/05-seo-funnel.md` |

## Usage in Claude Code

- Full pipeline: `"Use marketing-master to run the full GTM pipeline for this repo"`
- Direct task: `"Use marketing-master to write a launch X thread based on our README"`

## Repo layout

```
bin/cli.js                                   installer
skills/marketing-master/SKILL.md             orchestrator
skills/marketing-master/personas/            five frameworks, loaded one at a time
skills/marketing-master/references/          gold examples
skills/marketing-master/scripts/lint_copy.py anti-slop linter
examples/03-core-copy-example.md             copy that passes the linter
demo.tape                                    VHS recording of the demo gif
```

## Run the linter directly

```bash
python3 .claude/skills/marketing-master/scripts/lint_copy.py examples/03-core-copy-example.md
```

## Related

`natural-food-photographer-skill` ships the food photography director as a separate package, so this one stays focused on marketing.

## License

MIT
