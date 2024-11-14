"use client";

import { Persona } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

type ChatMessagesProps = {
  persona: Persona;
  isLoading: boolean;
  messages: ChatMessageProps[];
};

const ChatMessages = ({
  persona,
  isLoading,
  messages = [],
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading] = useState(messages.length === 0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className={"flex-1 overflow-y-auto pr-4"}>
      <ChatMessage
        isLoading={fakeLoading}
        src={persona.src}
        role={"system"}
        content={`Hello, I am ${persona.name}, ${persona.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          role={message.role}
          key={message.content}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && <ChatMessage role={"system"} src={persona.src} isLoading />}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatMessages;
