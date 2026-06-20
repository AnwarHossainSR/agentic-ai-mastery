// Module 04 — Structured Output (JavaScript version)
//
// Mirrors 04-structured-output.ipynb. Run from the project root:
//   node 04-structured-output/04-structured-output.mjs
//
// Same lesson. The only real difference from Python: schemas are defined with
// Zod (z.object) instead of Pydantic (BaseModel). Method name is the same idea:
// Python with_structured_output  ->  JS withStructuredOutput.

import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

import { initChatModel } from "langchain/chat_models/universal";
import { z } from "zod";

const model = await initChatModel("google-genai:gemini-2.5-flash", { temperature: 0 });
console.log("Key loaded:", Boolean(process.env.GOOGLE_API_KEY));

// --- 1. The problem: a string you have to parse ------------------------------
const text = "The new iPhone 15 costs $799 and weighs 171 grams.";
console.log("\n[1 - raw string]");
console.log((await model.invoke("Extract the product name, price, and weight from: " + text)).content);

// --- 2 & 3. Define a Zod schema, then withStructuredOutput -------------------
// .describe(...) is the JS equivalent of Pydantic's Field(description=...).
// The model reads these descriptions, so write them clearly.
const Product = z.object({
  name: z.string().describe("The product's name"),
  price_usd: z.number().describe("Price in US dollars, just the number"),
  weight_grams: z.number().int().describe("Weight in grams, just the number"),
});

const extractor = model.withStructuredOutput(Product);
const result = await extractor.invoke("The new iPhone 15 costs $799 and weighs 171 grams.");

console.log("\n[3 - typed object]");
console.log("Name:", result.name);
console.log("Price:", result.price_usd, "(", typeof result.price_usd, ")");
console.log("Weight:", result.weight_grams);
console.log("Price with tax:", Math.round(result.price_usd * 1.1 * 100) / 100); // a real number!

// --- 4. Constrain a field to fixed choices -----------------------------------
// z.enum is the JS equivalent of Python's Literal[...]. z.array(...) = list[...].
const Review = z.object({
  sentiment: z.enum(["positive", "negative", "mixed"]).describe("Overall sentiment"),
  topics: z.array(z.string()).describe("What aspects the review mentions, e.g. battery, price"),
  summary: z.string().describe("One short sentence summarizing the review"),
});

const reviewModel = model.withStructuredOutput(Review);
const out = await reviewModel.invoke(
  "I love the battery life but the camera is disappointing and the price is too high.",
);
console.log("\n[4 - classification]");
console.log(out);

// --- 5. Nested schemas & lists of objects ------------------------------------
// A field can be an array of another schema -> extract many objects at once.
const Team = z.object({
  people: z
    .array(z.object({
      name: z.string().describe("Person's name"),
      role: z.string().describe("Their job or role"),
    }))
    .describe("Everyone mentioned"),
});

const teamModel = model.withStructuredOutput(Team);
const team = await teamModel.invoke(
  "Ada is the lead engineer, Grace handles design, and Alan runs the project.",
);
console.log("\n[5 - list of objects]");
for (const p of team.people) console.log(`- ${p.name}: ${p.role}`);
