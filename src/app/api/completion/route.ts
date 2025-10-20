import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
