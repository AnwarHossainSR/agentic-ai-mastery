# Module 02 — Messages & Prompts

**Goal:** by the end of this module you can **control** a model instead of just talking to it — by setting its *role and rules* with a **system message**, structuring a conversation with **message types**, and reusing prompts with **prompt templates**.

## Why this module exists

So far you've sent the model a plain string. That works, but you have no control over *how* it behaves. Real apps need to say "you are a terse SQL assistant, never explain" once, then feed in different user questions. That separation — fixed instructions vs. changing input — is what **messages** and **prompt templates** give you.

## What you'll learn

1. **Message types** — `system`, `human`, `ai` — and what each one is for.
2. **The system message** — set the model's persona, rules, and output style up front.
3. **Multi-message input** — pass a list of messages instead of one string.
4. **Prompt templates** — write a prompt once with `{placeholders}`, fill them in later.
5. **Reuse** — the same template, many inputs, without copy-pasting strings.

## Before you start

1. Dependencies installed (`uv sync`), `ipykernel` available, kernel selected.
2. A `.env` in the project root with `GOOGLE_API_KEY=...`.
3. Open `02-messages-prompts.ipynb` and run the cells top to bottom (**Shift + Enter**).

## How this fits the bigger picture

Every later piece — structured output, tools, memory, agents — is built out of **messages**. Prompt templates are how you'll keep prompts clean and reusable once they grow. Get comfortable here and the advanced modules are mostly recombining these parts.

➡️ Open **`02-messages-prompts.ipynb`** to begin.
