# Case study draft: GameFarm

Status: draft, not on the site. Fill in every `TODO`, then get Xsolla's OK
on the names, numbers and diagram before it goes live at /work/gamefarm.

**Title:** Building a distributed mobile-game automation system
**Role:** AI Developer Intern, Xsolla · Sep – Nov 2026
**Key figures:** 10 s → 2 s per move · 1 → 72 Android devices · 6 countries · 3 new products built on it

## 01 · Overview
GameFarm runs real Android phones that play mobile games on their own, so
Xsolla can collect market and monetization data at scale. Each phone runs a
loop: read the screen, decide the next move, act, repeat.

## 02 · Problem
The first version sent a screenshot to a large language model for every move,
about 10 seconds a move, which is too slow to play a real session.
- TODO: where the 10 seconds went (upload, model time, parsing)
- TODO: why it mattered for the data

## 03 · Constraints
- Real phones, not emulators, in six countries, run by regional operators.
- TODO: cost per move, network limits between regions, acceptable move time

## 04 · Architecture
Orchestrator (GCP) → regional hubs (6 countries) → Android devices (72) → telemetry
Loop per phone: read screen → fast decision model → act (tap, swipe) → repeat
- TODO: correct the boxes to what you actually built; keep internal names out

## 05 · My contribution
- Built the core gameplay loop and the GCP infrastructure from scratch.
- Replaced the screenshot-to-LLM call with a fast decision model.
- Demoed to Xsolla's CTO, then scaled from 1 to 72 devices, coordinating
  regional operators and writing the handoff docs.
- Extended the device grid for webshop generation, goal-oriented mobile QA and
  cross-region payment benchmarking, while mentoring intern teams.
- TODO: who else was on the team, and which parts were theirs

## 06 · Decisions
- TODO: what you considered instead of the fast decision model, and what you gave up

## 07–08 · Evaluation and results
- TODO: what exactly was timed, over how many moves and games, typical or best case

## 09 · Limitations
- TODO: where the fast model fails, what you'd change next

## 10 · Links
No public repository (Xsolla's code). Related article: see article-screenshot-loop.md.
