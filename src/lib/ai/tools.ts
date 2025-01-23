import { CoreToolCallUnion, CoreToolResultUnion, tool } from "ai";
import { z } from "zod";
import { createResource } from "@/actions/resources-actions";
import { Resource } from "@prisma/client";
import { findRelevantContent } from "@/lib/ai/embedding";

export const toolSet = {
  getWeatherInformation: tool({
    description: "show the weather in a given city to the user",
    parameters: z.object({ city: z.string() }),
    execute: async ({}: { city: string }) => {
      return {
        value: 24,
        unit: "celsius",
        weeklyForecast: [
          { day: "Monday", value: 24 },
          { day: "Tuesday", value: 25 },
          { day: "Wednesday", value: 26 },
          { day: "Thursday", value: 27 },
          { day: "Friday", value: 28 },
          { day: "Saturday", value: 29 },
          { day: "Sunday", value: 30 },
        ],
      };
    },
  }),
  askForConfirmation: tool({
    description: "Ask the user for confirmation.",
    parameters: z.object({
      message: z.string().describe("The message to ask for confirmation."),
    }),
  }),
  addResource: tool({
    description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
    parameters: z.object({
      content: z
        .string()
        .describe("the content or resource to add to the knowledge base"),
    }),
    execute: async ({ content }) => createResource({ content } as Resource),
  }),
  getInformation: tool({
    description: `get information from your knowledge base to answer questions.`,
    parameters: z.object({
      question: z.string().describe("the users question"),
    }),
    execute: async ({ question }) => findRelevantContent(question),
  }),
};

type MyToolCall = CoreToolCallUnion<typeof toolSet>;
type MyToolResult = CoreToolResultUnion<typeof toolSet>;
