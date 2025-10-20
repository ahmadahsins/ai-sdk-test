import { groq } from "@ai-sdk/groq";
import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: convertToModelMessages(messages),
    tools: {
      weather: tool({
        description: "Get the weather in a location (fahrenheit)",
        inputSchema: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return {
            location,
            temperature,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
