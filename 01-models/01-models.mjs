// Module 01 — Models (JavaScript version)
//
// Mirrors 01-models.ipynb. Run from the project root:
//   node 01-models/01-models.mjs
//
// Same lesson as the notebook: invoke, stream, batch, switch providers, params.
// Note the JS spellings: initChatModel (camelCase), provider "google-genai"
// (hyphen, not underscore), and `await` on every model call.

import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

import { initChatModel } from "langchain/chat_models/universal";

const model = await initChatModel("google-genai:gemini-2.5-flash");
console.log("Key loaded:", Boolean(process.env.GOOGLE_API_KEY));

// --- 1. invoke — one complete answer -----------------------------------------
// Waits for the whole reply, returns it as one message.
const one = await model.invoke("Name three planets in our solar system.");
console.log("\n[invoke]\n" + one.content);

// --- 2. stream — answer piece by piece ---------------------------------------
// `stream` returns an async iterable of chunks. process.stdout.write avoids a
// newline per chunk (the JS equivalent of Python's print(..., end="")).
console.log("\n[stream]");
const stream = await model.stream("Explain what a token is, in two short sentences.");
for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
console.log();

// --- 3. batch — many prompts at once -----------------------------------------
// Pass an array; they run in parallel; you get an array of answers back.
const prompts = [
  "Give me a fun fact about the Moon.",
  "Give me a fun fact about the ocean.",
  "Give me a fun fact about honey.",
];
const answers = await model.batch(prompts);
console.log("\n[batch]");
prompts.forEach((p, i) => {
  console.log("Q:", p);
  console.log("A:", answers[i].content);
  console.log("-".repeat(40));
});

// --- 4. Switch providers — change one string ---------------------------------
//   initChatModel("google-genai:gemini-2.5-flash")    // Google
//   initChatModel("openai:gpt-4o-mini")               // OpenAI (needs OPENAI_API_KEY + @langchain/openai)
//   initChatModel("groq:llama-3.3-70b-versatile")     // Groq   (needs GROQ_API_KEY   + @langchain/groq)
// The three verbs above don't change — only the string does.
const other = await initChatModel("google-genai:gemini-2.5-flash");
console.log("\n[switch]\n" + (await other.invoke("Say hello in French.")).content);

// --- 5. Model parameters — temperature ---------------------------------------
// 0 = focused/repeatable, 0.9 = creative/varied. Same as Python.
const focused = await initChatModel("google-genai:gemini-2.5-flash", { temperature: 0 });
const creative = await initChatModel("google-genai:gemini-2.5-flash", { temperature: 0.9 });
const prompt = "Invent a name for a coffee shop on Mars.";
console.log("\n[params]");
console.log("temperature=0   ->", (await focused.invoke(prompt)).content);
console.log("temperature=0.9 ->", (await creative.invoke(prompt)).content);
