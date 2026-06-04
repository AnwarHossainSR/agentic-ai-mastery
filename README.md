# Zero to Agentic AI

A hands-on course that takes you from **knowing nothing about AI** to **building your own AI agents** with LangChain.

You do not need any AI background. You only need to be able to run Python code. Every concept is explained in plain language before you see any code.

## How to use this course

1. Go through the modules **in order** (00, then 01, then 02 …). Each one builds on the last.
2. Open the `.ipynb` notebook in each module folder and run the cells top to bottom.
3. Read the `README.md` in each folder first — it tells you *what* you're about to learn and *why*.
4. Do the **"Try it yourself"** task at the end of each notebook before moving on.

## Setup (do this once)

This project uses [uv](https://docs.astral.sh/uv/) to manage Python and packages.

```bash
# install all dependencies
uv sync

# you also need API keys in a .env file (see Module 00)
```

## The roadmap

| Module | Topic | What you'll be able to do |
| ------ | ----- | ------------------------- |
| **00** | Foundations | Understand what an LLM is, get API keys working, make your first call |
| **01** | Models | Talk to a model: invoke, stream, batch, switch providers |
| **02** | Messages & Prompts | Control the model with system/human messages and reusable prompt templates |
| **03** | Structured Output | Force the model to return clean, typed data (JSON / Pydantic) |
| **04** | Tools | Give the model your own functions to call |
| **05** | Chains (LCEL) | Glue steps together into pipelines with the `|` operator |
| **06** | Memory | Make a chatbot remember the conversation |
| **07** | RAG | Feed the model *your* documents using embeddings + a vector database |
| **08** | Agents | Build an agent that reasons, picks tools, acts, and loops |
| **09** | LangGraph | Model an agent as a graph with nodes, edges, state, and branching |
| **10** | Multi-Agent | Make several agents collaborate |
| **11** | Capstone | Build one complete agentic application end to end |

> Modules appear in this repo as you progress through the course — we build them one at a time.

## Glossary (bookmark this)

- **LLM (Large Language Model)** — the AI brain (e.g. Gemini, GPT) that predicts text.
- **Token** — a chunk of text (~¾ of a word). Models read and bill by tokens.
- **Prompt** — the input text you send to the model.
- **Provider** — the company hosting the model (Google, OpenAI, Groq).
- **Tool** — a normal function the model is allowed to call.
- **Agent** — an LLM in a loop that can use tools to reach a goal.
- **Embedding** — text turned into numbers so we can search by meaning.
- **Vector DB** — a database that stores embeddings and finds similar ones.
- **RAG** — Retrieval-Augmented Generation: look up relevant text, then answer.
