# Module 06 — Chains (LCEL)

**Goal:** by the end of this module you can **glue steps into a pipeline** with LangChain Expression Language (LCEL) — the `|` operator (`.pipe()` in JS) — so `prompt → model → parser` becomes one reusable object that streams and batches for free.

## Why this module exists

In earlier modules you kept doing two steps by hand: build the prompt, then invoke the model, then dig out `.text`. That manual wiring gets repetitive and clumsy as pipelines grow. **LCEL** lets you connect those pieces with `|` into a single **chain**. The payoff isn't just shorter code: any chain you build automatically supports `invoke`, `stream`, and `batch` (Module 01) across the *whole* pipeline.

## What you'll learn

1. **The `|` operator** — pipe a prompt into a model into a parser.
2. **Output parsers** — `StrOutputParser` to get a clean string out of the end.
3. **One reusable chain** — `invoke`/`stream`/`batch` all work on it, no extra code.
4. **Custom steps** — drop your own function into a chain (`RunnableLambda`).
5. **Composing chains** — feed one chain's output into the next to build multi-step flows.

## Before you start

1. `uv sync` (Python) and/or `npm install` (JS) done; `.env` has `GOOGLE_API_KEY=...`.
2. Python: open `06-chains-lcel.ipynb`, run top to bottom (**Shift + Enter**).
3. JS: from the project root, `node 06-chains-lcel/06-chains-lcel.mjs`.

## How this fits the bigger picture

LCEL is the *plumbing* of LangChain. RAG (Module 10) is a chain: retrieve → stuff context → model → parse. Many agent internals are chains too. Once `|` (or `.pipe()`) feels natural, the rest of the course reads like connecting Lego.

➡️ Open **`06-chains-lcel.ipynb`** (or run the `.mjs`) to begin.
