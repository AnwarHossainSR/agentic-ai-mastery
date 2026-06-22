// Module 06 — Chains (LCEL) (JavaScript version)
//
// Mirrors 06-chains-lcel.ipynb. Run from the project root:
//   node 06-chains-lcel/06-chains-lcel.mjs
//
// Same lesson: glue steps into a pipeline. The ONE big difference from Python:
// JS has no `|` operator overloading, so chains are built with `.pipe()`.
//   Python:  prompt | model | parser
//   JS:      prompt.pipe(model).pipe(parser)

import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

import { initChatModel } from "langchain/chat_models/universal";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableLambda } from "@langchain/core/runnables";

const model = await initChatModel("google-genai:gemini-2.5-flash", { temperature: 0.7 });
console.log("Key loaded:", Boolean(process.env.GOOGLE_API_KEY));

// --- 1. The manual way (what we're replacing) --------------------------------
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a witty copywriter."],
  ["human", "Write a one-line slogan for a product that does: {product}"],
]);

const filled = await prompt.invoke({ product: "a coffee mug that keeps drinks hot for 6 hours" });
const response = await model.invoke(filled);
console.log("\n[1 - manual]\n" + response.content);

// --- 2. The same thing as a chain --------------------------------------------
// .pipe() is JS's `|`. StringOutputParser pulls the plain string out of the end.
const chain = prompt.pipe(model).pipe(new StringOutputParser());

const result = await chain.invoke({ product: "a coffee mug that keeps drinks hot for 6 hours" });
console.log("\n[2 - chain] (" + typeof result + ") ->", result);

// --- 3. The chain is reusable: invoke / stream / batch -----------------------
process.stdout.write("\n[3 - stream] ");
const stream = await chain.stream({ product: "noise-cancelling headphones for cats" });
for await (const piece of stream) process.stdout.write(piece);

console.log("\n\n[3 - batch]");
const many = await chain.batch([
  { product: "a self-watering plant pot" },
  { product: "an umbrella that predicts rain" },
]);
for (const slogan of many) console.log("-", slogan);

// --- 4. Add your own step with RunnableLambda --------------------------------
// In JS, wrap a function with RunnableLambda.from(...) to put it in a chain.
const shout = RunnableLambda.from((s) => s.toUpperCase() + " 🔥");
const loudChain = prompt.pipe(model).pipe(new StringOutputParser()).pipe(shout);
console.log("\n[4 - custom step]");
console.log(await loudChain.invoke({ product: "a backpack with a built-in solar charger" }));

// --- 5. Compose chains — output of one into the next -------------------------
const namePrompt = ChatPromptTemplate.fromMessages([
  ["human", "Invent a single short brand name for a company that makes: {product}. Reply with only the name."],
]);
const sloganPrompt = ChatPromptTemplate.fromMessages([
  ["human", "Write a 5-word slogan for a brand called '{company}'. Reply with only the slogan."],
]);

const nameChain = namePrompt.pipe(model).pipe(new StringOutputParser());
const sloganChain = sloganPrompt.pipe(model).pipe(new StringOutputParser());

// nameChain outputs a string -> reshape into {company: ...} -> sloganChain
const reshape = RunnableLambda.from((name) => ({ company: name.trim() }));
const pipeline = nameChain.pipe(reshape).pipe(sloganChain);

console.log("\n[5 - composed]");
console.log("Slogan:", await pipeline.invoke({ product: "eco-friendly water bottles" }));
