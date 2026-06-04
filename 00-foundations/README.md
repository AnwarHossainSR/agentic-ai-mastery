# Module 00 — Foundations

**Goal:** understand the core ideas behind AI apps and prove your setup works by making one tiny model call.

You will learn:

- What an **LLM** actually is (in plain words, no math)
- What **tokens**, **prompts**, and **providers** are
- What **LangChain** is and why we use it
- How to get **API keys** and store them safely in `.env`
- How to make your **very first model call** and confirm everything is wired up

## Before you start

You need at least one API key. This course uses **Google Gemini** as the default because it has a generous free tier.

1. Go to https://aistudio.google.com/app/apikey and create an API key (free, sign in with Google).
2. In the project root there is a file called `.env`. Make sure it contains:

   ```
   GOOGLE_API_KEY=your_key_here
   ```

   (Optional — only if you want to use them later:)
   ```
   OPENAI_API_KEY=your_key_here
   GROQ_API_KEY=your_key_here
   ```

3. **Never** commit `.env` or share your keys. It is already in `.gitignore`.

## Then

Open **`00-foundations.ipynb`** and run every cell from top to bottom.

When the last cell prints a sentence from the model, you're done — move on to **Module 01**.
