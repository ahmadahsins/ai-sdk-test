import { groq } from "@ai-sdk/groq";
import { streamObject } from "ai";
import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    const result = streamObject({
      model: groq("meta-llama/llama-4-maverick-17b-128e-instruct"),
      output: "array",
      schema: pokemonSchema,
      prompt: `Generate a list of 5 pokemon for type ${type}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error streaming pokemon:", error);
    return new Response("Failed to stream pokemon", { status: 500 });
  }
}
