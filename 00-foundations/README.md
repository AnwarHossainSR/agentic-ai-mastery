# Module 00 — Foundations

**Goal:** by the end of this module you'll understand the core vocabulary everyone throws around (AI, LLM, token, prompt, provider, framework), and you'll make your **first AI call** from Python.

## Why this module exists

Before you can build agents, you need a correct mental model of what's actually happening when "the AI answers." Most confusion later comes from skipping this. We go slow here on purpose.

## What you'll learn

1. **What an LLM is** — and the one property (statelessness) that explains 80% of later design decisions.
2. **Tokens** — why they control both your *bill* and the *limits* you'll hit.
3. **What a framework (LangChain) is** — and *why* we use one instead of calling each provider's API directly.
4. **API keys & `.env`** — how to authenticate safely without leaking secrets.
5. **Your first call** — load a model, send a prompt, read the reply, inspect the metadata.

## Before you start

1. Make sure dependencies are installed (from the project root):
   ```bash
   uv sync
   ```
2. Make sure there's a `.env` file in the **project root** with at least:
   ```
   GOOGLE_API_KEY=your_key_here
   ```
   Get a free Gemini key at https://aistudio.google.com/app/apikey.
3. Open `00-foundations.ipynb` and run the cells top to bottom.

## How this fits the bigger picture

Everything in this course — prompts, tools, memory, RAG, agents — is built on top of the single call you make here (`init_chat_model` → `.invoke`). Master this one move and the rest is composition.

➡️ Open **`00-foundations.ipynb`** to begin.
</content>
