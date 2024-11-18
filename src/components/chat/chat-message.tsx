"use client";

import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import BotAvatar from "@/components/chat/bot-avatar";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { BeatLoader } from "react-spinners";

export type ChatMessageProps = {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
};

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard.",
    });
  };

  return (
    <div
      className={cn(
        "group flex w-full items-start gap-x-3 py-4",
        role === "user" && "justify-end",
      )}
    >
      {role !== "user" && src && (
        <BotAvatar className={"h-10 w-10"} src={src} />
      )}
      <div
        className={cn(
          "max-w-sm rounded-md px-4 py-2 text-sm",
          role === "system" ? "bg-muted" : "bg-primary text-primary-foreground",
        )}
      >
        {isLoading ? (
          <BeatLoader
            size={5}
            className={"my-auto"}
            color={theme === "light" ? "black" : "white"}
          />
        ) : (
          content
        )}
      </div>
      {role !== "user" && !isLoading && (
        <Button
          variant={"ghost"}
          onClick={onCopy}
          className={"opacity-0 transition group-hover:opacity-100"}
        >
          <Copy className={"h-4 w-4"} />
        </Button>
      )}
    </div>
  );
};
