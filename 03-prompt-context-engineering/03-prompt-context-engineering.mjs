// Module 03 — Prompt & Context Engineering (JavaScript version)
//
// Mirrors 03-prompt-context-engineering.ipynb. Run from the project root:
//   node 03-prompt-context-engineering/03-prompt-context-engineering.mjs
//
// Same lesson: specificity, few-shot, delimiters + output format, step-by-step
// reasoning, and the context window. JS spellings: fromMessages, `await`.

import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

import { initChatModel } from "langchain/chat_models/universal";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// temperature: 0 -> repeatable answers, so prompt comparisons are fair.
const model = await initChatModel("google-genai:gemini-2.5-flash", { temperature: 0 });
console.log("Key loaded:", Boolean(process.env.GOOGLE_API_KEY));

const line = "=".repeat(60);

// --- 1. Specificity — vague in, vague out ------------------------------------
const vague = "Tell me about Python.";
const specific =
  "Explain what the Python programming language is to a complete beginner. " +
  "Use exactly 3 bullet points, each one sentence, no jargon.";

console.log("\n[1] VAGUE:\n" + (await model.invoke(vague)).content);
console.log("\n" + line + "\n");
console.log("[1] SPECIFIC:\n" + (await model.invoke(specific)).content);

// --- 2. Few-shot prompting — show, don't just tell ---------------------------
// Example input (human) -> desired output (ai) pairs teach the pattern.
const fewShot = ChatPromptTemplate.fromMessages([
  ["system", "You turn a word into exactly three emojis that represent it. Output only the emojis."],
  ["human", "pizza"],
  ["ai", "🍕🧀🍅"],
  ["human", "rain"],
  ["ai", "🌧️☔💧"],
  ["human", "{word}"],
]);
const fsPrompt = await fewShot.invoke({ word: "birthday" });
console.log("\n[2] few-shot:", (await model.invoke(fsPrompt)).content);

// --- 3. Delimiters & explicit output format ----------------------------------
// Fence user data so the model can't confuse it with instructions, then demand
// an exact output shape. Template literals (backticks) are JS's f-strings.
const userText =
  "I love the battery life but the camera is disappointing and the price is too high.";
const analyzePrompt = `Analyze the customer review delimited by triple backticks.

Output EXACTLY this format, nothing else:
SENTIMENT: <positive|negative|mixed>
TOPICS: <comma-separated list>

\`\`\`
${userText}
\`\`\``;
console.log("\n[3]\n" + (await model.invoke(analyzePrompt)).content);

// --- 4. Step-by-step reasoning -----------------------------------------------
const problem =
  "A shop sells pens at 3 for $2. I have $10. How many pens can I buy, and how much change do I get?";
const rushed = problem + " Answer with just the final numbers.";
const stepwise = problem + " Think step by step, show your work, then give the final answer.";

console.log("\n[4] RUSHED:\n" + (await model.invoke(rushed)).content);
console.log("\n" + line + "\n");
console.log("[4] STEP BY STEP:\n" + (await model.invoke(stepwise)).content);

// --- 5. The context window — and what to put in it ---------------------------
const question = "What is our refund window, and does it apply to sale items?";

console.log("\n[5] NO CONTEXT:\n" + (await model.invoke(question)).content);

const context = `Company policy:
- Refunds accepted within 30 days of purchase.
- Sale and clearance items are final — no refunds.
- Refunds are issued to the original payment method.`;

const grounded = ChatPromptTemplate.fromMessages([
  ["system", "Answer ONLY using the policy below. If it's not covered, say you don't know.\n\n{policy}"],
  ["human", "{question}"],
]);
const groundedPrompt = await grounded.invoke({ policy: context, question });
console.log("\n" + line + "\n");
console.log("[5] WITH CONTEXT:\n" + (await model.invoke(groundedPrompt)).content);
