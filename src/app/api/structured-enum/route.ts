import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const result = await generateObject({
      model: groq("meta-llama/llama-4-maverick-17b-128e-instruct"),
      output: "enum",
      enum: ["positive", "negative", "neutral"],
      prompt: `Classify the sentiment of the following text: ${text}`,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.error("Error classifying sentiment:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
