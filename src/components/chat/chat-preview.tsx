import { Message } from "ai";
import { ForwardedRef } from "react";
import ChatMessages from "@/components/chat/chat-messages";
import { Persona } from "@prisma/client";
import ChatHeader from "@/components/chat/chat-header";

type ChatPreviewProps = {
  messages: Message[];
  persona: Persona;
  isLoading: boolean;
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;
  numberOfMessages: number;
  ref: ForwardedRef<HTMLDivElement>;
};

const ChatPreview = ({
  messages,
  ref,
  addToolResult,
  persona,
  isLoading,
  numberOfMessages,
}: ChatPreviewProps) => {
  return (
    <div
      ref={ref}
      className={"relative flex w-full flex-1 justify-center overflow-y-auto"}
    >
      <div
        className={
          "flex h-full w-full max-w-[800px] flex-col items-center gap-4 px-4 pt-4"
        }
      >
        <ChatMessages
          addToolResult={addToolResult}
          messages={messages}
          isLoading={isLoading}
          persona={persona}
        />
      </div>
    </div>
  );
};

export default ChatPreview;
