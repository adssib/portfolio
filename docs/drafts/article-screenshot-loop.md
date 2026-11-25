# Article draft: Why I replaced screenshot-to-LLM calls in an automation loop

Status: draft, not on the site. /writing and the homepage Writing section go
live once this is finished. Fill in every `TODO`.

Tag: Agents · about 6 min

GameFarm plays mobile games on real phones. Every move used to start the same
way: take a screenshot, send it to a large language model, wait for it to say
where to tap. It worked, and it took about ten seconds a move.

## Ten seconds is a long time in a game
A person makes a move in about a second. At ten, sessions drag, timers run out,
and a fleet of phones spends most of its day waiting on one API.
- TODO: breakdown of where the 10 seconds went

## The fast path
Most moves don't need a model that can read anything. They need one that knows
this game's screens. So the loop got a fast decision model for the common case.
- TODO: what the fast model is, what it sees, and when (if ever) the loop falls back to the big one
- Result: 10 s → 2 s per move. TODO: how it was measured

## What it cost
- TODO: what the fast path gets wrong, and how you noticed

## What I'd do differently
- TODO: one or two honest lessons

Related: the GameFarm case study.
