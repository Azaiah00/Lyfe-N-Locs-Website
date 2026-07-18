# START HERE — Lyfe N' Locs Website Build

Hi Frederick 👋 — this repo is pre-loaded with everything Claude Code needs. Here's the order
of operations.

## 1. Confirm the stack scaffold (optional first prompt)
If the repo has no Next.js app yet, tell Claude Code:
> "Scaffold a Next.js 15 App Router + TypeScript + Tailwind v4 + React 19 project in this repo
> following CLAUDE.md and DESIGN.md. Set up next/font (Fraunces, Manrope, Ephesis), the
> Tailwind v4 @theme token block from DESIGN.md §8, a base layout with the sticky nav +
> footer, and the gold-dust background primitive. Don't build pages yet."

## 2. Build the marketing website
Open `docs/BUILD-PROMPTS.md`, copy **PROMPT A**, paste it into Claude Code. It will build all
seven routes with the real copy from `docs/CONTENT.md` and the menu from `docs/SERVICES.md`.

## 3. Build the booking portal
Copy **PROMPT B** from `docs/BUILD-PROMPTS.md`. It builds the guided, deposit-protected
booking flow and wires it into `/book`.

## 4. Generate images
Use the prompts in `docs/IMAGE-PROMPTS.md` (Higgsfield / Nano Banana). Drop results in
`/public/images` using the filenames the build expects, then ask Claude Code to rebuild.
**Replace AI placeholders with her real work photos before launch.**

## 5. Resolve the CONFIRM list
`docs/CONFIRM.md` lists everything the owner must verify (her name, deposit rule, real
reviews, prep instructions, etc.). Nothing fabricated ships — unknowns show as 【CONFIRM】
until answered.

## 6. Deploy
Ask Claude Code to add Vercel or Netlify config + `docs/DEPLOY.md`, then connect this GitHub
repo (github.com/Azaiah00/Lyfe-N-Locs-Website) to the host.

---
**Golden rule for every prompt:** start it with *"Follow CLAUDE.md and DESIGN.md exactly."*
