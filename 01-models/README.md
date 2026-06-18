# Module 01 — Models

**Goal:** by the end of this module you can *talk to a model four ways* — `invoke`, `stream`, and `batch` — switch providers without rewriting your code, and tune a model's behavior with parameters like `temperature`.

## Why this module exists

In Module 00 you made a single call with `.invoke()`. That's one of several ways to talk to a model, and each exists for a different real-world reason: one answer vs. a live typing effect vs. many prompts at once. Knowing which to reach for is the difference between an app that feels slow and one that feels instant.

## What you'll learn

1. **`invoke`** — get one complete answer (recap from Module 00, now with intent).
2. **`stream`** — receive the answer piece by piece, like ChatGPT typing, so users don't stare at a blank screen.
3. **`batch`** — send many prompts in one go and let them run in parallel (faster + simpler than a `for` loop).
4. **Switching providers** — the same code runs on Gemini, OpenAI, or Groq by changing *one string*.
5. **Model parameters** — `temperature`, `max_tokens`, and friends, to steer how the model responds.

## Before you start

1. Dependencies installed (`uv sync` from the project root).
2. A `.env` in the **project root** with at least `GOOGLE_API_KEY=...` (same as Module 00).
3. Open `01-models.ipynb` and run the cells top to bottom (**Shift + Enter**).

## How this fits the bigger picture

`invoke`, `stream`, and `batch` are the three verbs you'll use for the *rest of the course*. Every chain, tool call, and agent ultimately bottoms out in one of them. Switching providers and setting parameters are the knobs you'll reach for constantly once you're building real things.

➡️ Open **`01-models.ipynb`** to begin.
