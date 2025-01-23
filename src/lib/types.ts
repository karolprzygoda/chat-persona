import { Chat, Message, Persona } from "@prisma/client";
import { Attachment, JSONValue, ToolInvocation } from "ai";

declare global {
  namespace PrismaJson {
    type ToolInvocations = ToolInvocation[];
    type Annotations = JSONValue[] | undefined;
    type Data = JSONValue;
    type ExperimentalAttachments = Attachment[];
  }
}

export type ChatType = Chat & {
  persona: Persona;
  messages: Message[];
  _count: {
    messages: number;
  };
};
