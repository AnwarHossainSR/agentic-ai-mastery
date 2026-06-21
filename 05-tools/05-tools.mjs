// Module 05 — Tools (JavaScript version)
//
// Mirrors 05-tools.ipynb. Run from the project root:
//   node 05-tools/05-tools.mjs
//
// Same lesson: define tools, bindTools, the model REQUESTS a call (doesn't run
// it), you run it and return a ToolMessage, then invoke again. JS spellings:
// tool() with a Zod schema, bindTools (camelCase), toolCalls on the response.

import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

import { initChatModel } from "langchain/chat_models/universal";
import { tool } from "@langchain/core/tools";
import { HumanMessage, ToolMessage } from "@langchain/core/messages";
import { z } from "zod";

const model = await initChatModel("google-genai:gemini-2.5-flash", { temperature: 0 });
console.log("Key loaded:", Boolean(process.env.GOOGLE_API_KEY));

// --- 1. Define tools ---------------------------------------------------------
// In JS a tool = a function + a config object. The `description` is what the
// model reads to decide when to use it; `schema` (Zod) defines the arguments.
const multiply = tool(({ a, b }) => a * b, {
  name: "multiply",
  description: "Multiply two numbers together.",
  schema: z.object({ a: z.number(), b: z.number() }),
});

const getWeather = tool(({ city }) => `It's 22°C and sunny in ${city}.`, {
  name: "get_weather",
  description: "Get the current weather for a given city.",
  schema: z.object({ city: z.string() }),
});

console.log(multiply.name, "->", multiply.description);
console.log(getWeather.name, "->", getWeather.description);

// --- 2. Bind tools to the model ----------------------------------------------
const modelWithTools = model.bindTools([multiply, getWeather]);

const plain = await modelWithTools.invoke("Say hello in one word.");
console.log("\n[plain] text:", plain.content);
console.log("[plain] tool_calls:", plain.tool_calls); // empty -> just answered

// --- 3. The model requests a tool call ---------------------------------------
const response = await modelWithTools.invoke("What is 12 multiplied by 7?");
console.log("\n[request] text:", JSON.stringify(response.content)); // likely empty
console.log("[request] tool_calls:", response.tool_calls);          // it only ASKED

// --- 4. Run the tool and return the result -----------------------------------
const toolsByName = { multiply, get_weather: getWeather };

let messages = [new HumanMessage("What is 12 multiplied by 7?")];
let aiMsg = await modelWithTools.invoke(messages);
messages.push(aiMsg); // 1. keep the model's request in history

for (const call of aiMsg.tool_calls) {                 // 2. run each requested tool
  const chosen = toolsByName[call.name];
  const result = await chosen.invoke(call.args);
  messages.push(new ToolMessage({ content: String(result), tool_call_id: call.id }));
  console.log(`\nRan ${call.name}(${JSON.stringify(call.args)}) -> ${result}`);
}

let final = await modelWithTools.invoke(messages);     // 3. ask again, with the result
console.log("Final answer:", final.content);

// --- 5. The model picks the right tool ---------------------------------------
messages = [new HumanMessage("What's the weather in Tokyo?")];
aiMsg = await modelWithTools.invoke(messages);
messages.push(aiMsg);

for (const call of aiMsg.tool_calls) {
  const chosen = toolsByName[call.name];
  const result = await chosen.invoke(call.args);
  messages.push(new ToolMessage({ content: String(result), tool_call_id: call.id }));
  console.log(`\nModel chose: ${call.name}(${JSON.stringify(call.args)})`);
}

final = await modelWithTools.invoke(messages);
console.log("Final answer:", final.content);
