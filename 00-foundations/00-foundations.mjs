// Module 00 — Foundations (JavaScript version)
//
// Mirrors 00-foundations.ipynb. Run it from the project root:
//   node 00-foundations/00-foundations.mjs
//
// This is the SAME lesson as the Python notebook. Read the notebook's markdown
// for the explanations (what an LLM is, tokens, statelessness). Here we focus on
// the JS code so you can see how the identical ideas look in JavaScript.

// --- Load the API key from the .env file in the project root ------------------
// In Python we used python-dotenv; in JS we use the `dotenv` package.
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") }); // .env is one folder up

const key = process.env.GOOGLE_API_KEY;
console.log("GOOGLE_API_KEY found:", Boolean(key));
if (key) console.log("It starts with:", key.slice(0, 4) + "..."); // safe preview only

// --- Your first model call ----------------------------------------------------
// Python:  init_chat_model("google_genai:gemini-2.5-flash")   <- underscore
// JS:      initChatModel("google-genai:gemini-2.5-flash")     <- hyphen!
// Same idea, one different character. Everything in JS is async, so we `await`.
import { initChatModel } from "langchain/chat_models/universal";

const model = await initChatModel("google-genai:gemini-2.5-flash");

const response = await model.invoke(
  "In one short sentence, explain what an LLM is to a 10-year-old.",
);

console.log("\nThe text:", response.content);

// --- What did we get back? ----------------------------------------------------
// Like Python's AIMessage, the JS response carries metadata, including token usage.
console.log("\nType of response:", response.constructor.name);
console.log("Token usage:", response.usage_metadata);
