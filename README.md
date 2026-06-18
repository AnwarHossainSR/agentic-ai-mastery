# Zero to Agentic AI — Mastery Course

A hands-on course that takes you from **knowing nothing about AI** to **building, evaluating, and shipping production AI agents** — with LangChain, vector databases, semantic search, and the modern agent tooling ecosystem.

You do not need any AI background. You only need to be able to run Python code. Every concept is explained in plain language **before** you see any code.

## How to use this course

1. Go through the modules **in order** (00, then 01, then 02 …). Each one builds on the last.
2. In each module folder, **read the `README.md` first** — it tells you *what* you're about to learn and *why it matters*.
3. Then open the `.ipynb` notebook and run the cells top to bottom (**Shift + Enter**).
4. Do the **"Try it yourself"** task at the end of each notebook before moving on. That's where the learning sticks.
5. We build **one module at a time.** When you've finished one, say **"next"** and I'll build the following module.

## Setup (do this once)

This project uses [uv](https://docs.astral.sh/uv/) to manage Python and packages.

```bash
# install all dependencies
uv sync

# you also need API keys in a .env file (see Module 00)
```

### Two language tracks: Python and JavaScript

Each module ships the **same lesson in both languages** so you can learn them side by side:

- **Python** — the `NN-name.ipynb` notebook. Run cells with **Shift + Enter** (needs `uv sync`).
- **JavaScript** — the `NN-name.mjs` file. Run it from the **project root** with Node:
  ```bash
  npm install                       # once, installs the JS LangChain packages
  node 01-models/01-models.mjs      # run any module's JS version
  ```

The code is intentionally parallel. The one spelling gotcha: the provider id is `google_genai` (underscore) in Python and `google-genai` (hyphen) in JS; method names are snake_case in Python (`init_chat_model`) and camelCase in JS (`initChatModel`), and **every model call is `await`ed** in JS.

## The roadmap

The course is in four parts: first you learn to **talk to a model**, then to **give it knowledge**, then to **make it act as an agent**, and finally to **ship it like a professional**.

### Part 1 — Foundations & core LLM skills
| # | Module | What you'll be able to do |
|---|--------|---------------------------|
| **00** | Foundations | Understand what an LLM is, get API keys working, make your first call |
| **01** | Models | Talk to a model: invoke, stream, batch, switch providers |
| **02** | Messages & Prompts | Control the model with system/human messages and reusable prompt templates |
| **03** | Prompt & Context Engineering | Design prompts and context windows that reliably steer model behavior |
| **04** | Structured Output | Force the model to return clean, typed data (JSON / Pydantic) |
| **05** | Tools | Give the model your own functions to call |
| **06** | Chains (LCEL) | Glue steps together into pipelines with the `\|` operator |
| **07** | Memory | Make a chatbot remember the conversation |

### Part 2 — Knowledge & retrieval (semantic search)
| # | Module | What you'll be able to do |
|---|--------|---------------------------|
| **08** | Embeddings & Semantic Search | Turn text into vectors, measure meaning, chunk documents well |
| **09** | Vector Databases | Store & search vectors (Chroma, pgvector), hybrid search, reranking |
| **10** | RAG | Answer questions over *your* documents, end to end |

### Part 3 — Agents
| # | Module | What you'll be able to do |
|---|--------|---------------------------|
| **11** | Agents | Build an agent that reasons, picks tools, acts, and loops |
| **12** | LangGraph | Model an agent as a graph with nodes, edges, state, and branching |
| **13** | Multi-Agent | Make several agents collaborate |
| **14** | MCP & Integrations | Connect agents to real tools/data via the Model Context Protocol |

### Part 4 — Expert / Forward-Deployed (production)
| # | Module | What you'll be able to do |
|---|--------|---------------------------|
| **15** | Evaluation & Observability | Measure quality, trace runs, watch cost & latency |
| **16** | Production & Deployment | Serve agents as APIs: async, streaming, caching, security |
| **17** | Capstone | Build one complete agentic application end to end |

> Modules appear in this repo as you progress — we build them one at a time so you're never overwhelmed.

## Glossary (bookmark this)

- **AI / LLM (Large Language Model)** — the AI "brain" (e.g. Gemini, GPT) that predicts text.
- **Token** — a chunk of text (~¾ of a word). Models read and bill by tokens.
- **Prompt** — the input text you send to the model.
- **Provider** — the company hosting the model (Google, OpenAI, Groq).
- **Framework** — a reusable code layer (LangChain) so you don't re-write plumbing for every provider.
- **Tool** — a normal function the model is allowed to call.
- **Agent** — an LLM in a loop that can use tools to reach a goal.
- **Embedding** — text turned into numbers (a vector) so we can search by *meaning*.
- **Semantic search** — finding text by meaning instead of exact keywords.
- **Vector DB** — a database that stores embeddings and finds similar ones fast.
- **RAG** — Retrieval-Augmented Generation: look up relevant text, then answer.
- **MCP** — Model Context Protocol: a standard way to plug tools/data into any agent.
- **Eval** — an automated test that scores how good a model's output is.
</content>
</invoke>
