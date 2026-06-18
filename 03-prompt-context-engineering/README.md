# Module 03 — Prompt & Context Engineering

**Goal:** by the end of this module you can write prompts that **reliably** steer a model — using specificity, examples (few-shot), delimiters, explicit output formats, and step-by-step reasoning — and you'll understand the **context window** well enough to decide *what* to put in it.

## Why this module exists

In Module 02 you learned the *mechanics* of messages and templates. This module is about the *craft*: the same model gives a bad answer to a vague prompt and a great answer to a well-engineered one. Most "the AI is dumb" moments are actually prompt problems. And because the context window is **finite**, choosing what to include (context engineering) is its own skill — the one that RAG and agents are built on later.

## What you'll learn

1. **Specificity** — why vague prompts fail, and how to make instructions unambiguous.
2. **Few-shot prompting** — teach the model the pattern you want by *showing* examples.
3. **Delimiters & output format** — fence the input and demand an exact shape so the output is parseable.
4. **Step-by-step reasoning** — when asking the model to "think first" improves accuracy.
5. **The context window** — what it is, why it's finite, and the idea of putting only *relevant* context in (the seed of RAG).

## Before you start

1. `uv sync` (Python) and/or `npm install` (JS) done; `.env` has `GOOGLE_API_KEY=...`.
2. Python: open `03-prompt-context-engineering.ipynb`, run top to bottom (**Shift + Enter**).
3. JS: from the project root, `node 03-prompt-context-engineering/03-prompt-context-engineering.mjs`.

## How this fits the bigger picture

Structured output (Module 04), tools (05), and agents (11+) all depend on prompts the model follows reliably. Context engineering — deciding what information to fit in a finite window — is exactly the problem **RAG** (Module 10) solves automatically. This module is the manual version, so you understand what's happening later.

➡️ Open **`03-prompt-context-engineering.ipynb`** (or run the `.mjs`) to begin.
