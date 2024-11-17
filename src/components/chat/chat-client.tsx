"use client";

import { Message, Persona } from "@prisma/client";
import ChatHeader from "@/components/chat/chat-header";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import ChatForm from "@/components/chat/chat-form";
import ChatMessages from "@/components/chat/chat-messages";
import { ChatMessageProps } from "@/components/chat/chat-message";

type ChatClientProps = {
  persona: Persona & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

const ChatClient = ({ persona }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    persona.messages,
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `api/chat/${persona.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className={"flex h-screen flex-col space-y-2 p-4"}>
      <ChatHeader persona={persona} />
      {/*<div>Messages TODO</div>*/}
      <ChatMessages
        persona={persona}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ChatClient;
