"use client";

import { Persona } from "@prisma/client";
import { Message } from "ai";
import { ChatMessage } from "@/components/chat/chat-message";

type ChatMessagesProps = {
  persona: Persona;
  isLoading: boolean;
  messages: Message[];
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;
};

const ChatMessages = ({
  persona,
  isLoading,
  messages = [],
  addToolResult,
}: ChatMessagesProps) => {
  return messages.map((message) => (
    <ChatMessage
      addToolResult={addToolResult}
      message={message}
      src={persona.src}
      key={message.id}
    />
  ));
};

export default ChatMessages;
