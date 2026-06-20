# Module 04 — Structured Output

**Goal:** by the end of this module you can make a model return **clean, typed data** — a Python object (Pydantic) or a JS object (Zod) with the exact fields you defined — instead of a freeform paragraph you have to parse by hand.

## Why this module exists

`.text` gives you a string. Strings are great for humans, terrible for programs: to use "the sentiment is positive and the topics are battery, price" in code, you'd write fragile parsing that breaks the moment the model phrases it differently. **Structured output** flips it: you declare a schema, and LangChain forces the model to fill it. You get back a real object with `.name`, `.price`, `.sentiment` — guaranteed shape, ready to use.

## What you'll learn

1. **The problem with strings** — why parsing free text is fragile.
2. **`with_structured_output`** — bind a schema to a model so it returns typed data.
3. **Schemas** — Pydantic (Python) / Zod (JS), with field types and descriptions that *guide* the model.
4. **Enums & constraints** — restrict a field to a fixed set of values (e.g. sentiment).
5. **Nested & list fields** — extract many items, or objects within objects.

## Before you start

1. `uv sync` (Python) and/or `npm install` (JS) done; `.env` has `GOOGLE_API_KEY=...`.
2. Python: open `04-structured-output.ipynb`, run top to bottom (**Shift + Enter**).
3. JS: from the project root, `node 04-structured-output/04-structured-output.mjs`.

## How this fits the bigger picture

Structured output is the backbone of **tools** (Module 05) and **agents** (11+): when a model "calls a tool," it's really producing structured arguments that match a schema — exactly what you'll do here. Master this and tool-calling will feel obvious.

➡️ Open **`04-structured-output.ipynb`** (or run the `.mjs`) to begin.
