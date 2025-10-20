import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    return new Response("Failed to stream text", {
      status: 500,
    });
  }
}
