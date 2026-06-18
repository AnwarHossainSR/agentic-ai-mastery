// Module 02 — Messages & Prompts (JavaScript version)
//
// Mirrors 02-messages-prompts.ipynb. Run from the project root:
//   node 02-messages-prompts/02-messages-prompts.mjs
//
// Same lesson: message roles (system/human/ai), the system message as your
// control lever, and reusable prompt templates. JS spellings differ from
// Python: fromMessages (camelCase), `await` everywhere.

import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

import { initChatModel } from "langchain/chat_models/universal";

const model = await initChatModel("google-genai:gemini-2.5-flash");
console.log("Key loaded:", Boolean(process.env.GOOGLE_API_KEY));

// --- 2. Your first system message --------------------------------------------
// A model takes a LIST of messages, each with a role. Simplest form: [role, text]
// tuples — same as Python. The `system` message sets the rules; `human` is the user.
let messages = [
  ["system", "You are a grumpy pirate. Answer everything in pirate slang, in one sentence."],
  ["human", "What is the weather like today?"],
];
console.log("\n[pirate]\n" + (await model.invoke(messages)).content);

// --- 3. Same question, different system message -------------------------------
// Only the system message changed. You can also use explicit message objects.
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

messages = [
  new SystemMessage("You are a precise science teacher. Answer in one clear sentence, no jokes."),
  new HumanMessage("What is the weather like today?"),
];
console.log("\n[teacher]\n" + (await model.invoke(messages)).content);

// --- 5. ChatPromptTemplate — write once, reuse -------------------------------
// {curly_braces} mark the parts that change. Python: from_messages -> JS: fromMessages.
import { ChatPromptTemplate } from "@langchain/core/prompts";

const template = ChatPromptTemplate.fromMessages([
  ["system", "You are a translator. Translate the user's text into {language}. Reply with only the translation."],
  ["human", "{text}"],
]);

// Filling the template builds the finished messages; it does NOT call the model.
const filled = await template.invoke({ language: "French", text: "Good morning, how are you?" });
console.log("\n[filled messages]");
console.log(filled.messages);

// --- 6. Template + model together --------------------------------------------
// Two steps: fill the template, then invoke the model. Reuse the template,
// change only the inputs.
async function translate(language, text) {
  const prompt = await template.invoke({ language, text });
  return (await model.invoke(prompt)).content;
}

console.log("\n[translate]");
console.log(await translate("French", "Where is the train station?"));
console.log(await translate("Japanese", "Where is the train station?"));
console.log(await translate("German", "I would like a coffee, please."));
