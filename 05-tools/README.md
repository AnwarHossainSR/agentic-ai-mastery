# Module 05 — Tools

**Goal:** by the end of this module you can give a model your own **functions to call** — define a tool, bind it, see the model *decide* to use it, run it yourself, and feed the result back for a final answer.

## Why this module exists

An LLM only predicts text. It can't actually multiply big numbers reliably, look up today's weather, or query your database. **Tools** bridge that gap: you describe functions the model is allowed to call, and when a question needs one, the model returns a structured request to call it (the schema skill from Module 04 in action). *You* run the function and hand the result back. This request→run→answer loop is the exact thing an **agent** automates later.

## What you'll learn

1. **What a tool is** — a normal function plus a description the model reads.
2. **Defining tools** — the `@tool` decorator (Python) / `tool()` (JS); why the docstring/description matters.
3. **`bind_tools`** — attach tools to a model so it *can* call them.
4. **Tool calls** — the model returns `tool_calls`; crucially, it does **not** run them.
5. **The loop** — run the tool yourself, return a `ToolMessage`, invoke again for the final answer.

## Before you start

1. `uv sync` (Python) and/or `npm install` (JS) done; `.env` has `GOOGLE_API_KEY=...`.
2. Python: open `05-tools.ipynb`, run top to bottom (**Shift + Enter**).
3. JS: from the project root, `node 05-tools/05-tools.mjs`.

## How this fits the bigger picture

This module is an **agent with the loop done by hand**. In Module 11 you'll replace the manual run→return→invoke steps with `create_agent`, which runs that loop for you until the task is done. Everything there rests on what you build here.

➡️ Open **`05-tools.ipynb`** (or run the `.mjs`) to begin.
