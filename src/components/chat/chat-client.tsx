"use client";

import ChatHeader from "@/components/chat/chat-header";
import { useEffect, useRef, useState } from "react";
import ChatForm from "@/components/chat/chat-form";
import { useChat } from "@ai-sdk/react";
import { createIdGenerator, Message } from "ai";
import { ChatType } from "@/lib/types";
import { toast } from "sonner";
import ChatPreview from "@/components/chat/chat-preview";

type ChatClientProps = {
  chat: ChatType;
};

const ChatClient = ({ chat }: ChatClientProps) => {
  const initialMessage = "Hello how can i assist you today?";
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(true);

  const {
    input,
    isLoading,
    stop,
    handleInputChange,
    handleSubmit,
    error,
    messages,
    addToolResult,
  } = useChat({
    api: `/api/chat/${chat.id}`,
    initialMessages: (chat.messages as unknown as Message[]) ?? [
      {
        id: "initial message",
        role: "assistant",
        content: streamedText,
      },
    ],
    sendExtraMessageFields: true,
    experimental_throttle: 50,
    generateId: createIdGenerator({
      prefix: "msgc",
      size: 16,
    }),
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === "getLocation") {
        const cities = ["New York", "Los Angeles", "Chicago", "San Francisco"];
        return cities[Math.floor(Math.random() * cities.length)];
      }
    },
  });

  useEffect(() => {
    console.log(error);

    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  useEffect(() => {
    let currentIndex = 0;
    if (isStreaming) {
      const interval = setInterval(() => {
        if (currentIndex <= initialMessage.length) {
          setStreamedText(initialMessage.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsStreaming(false);
          clearInterval(interval);
        }
      }, 25);

      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  const chatPreviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatPreviewRef.current) {
      chatPreviewRef.current.scrollTop = chatPreviewRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={"absolute flex h-full w-full flex-col items-center gap-4 pb-4"}
    >
      <ChatHeader persona={chat.persona} messageCount={chat._count.messages} />
      <ChatPreview
        ref={chatPreviewRef}
        isLoading={isLoading}
        persona={chat.persona}
        numberOfMessages={chat._count.messages}
        messages={messages}
        addToolResult={addToolResult}
      />
      <ChatForm
        input={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onStop={stop}
      />
    </div>
  );
};

export default ChatClient;
