"use client";

import { Persona } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessageSquare, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import BotAvatar from "@/components/chat/bot-avatar";
import ManagePersonaDropdown from "@/components/persona/manage-persona-dropdown";

type ChatHeaderProps = {
  persona: Persona;
  messageCount: number;
};

const ChatHeader = ({ persona, messageCount }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <header
      className={
        "sticky top-0 flex w-full max-w-[800px] items-center justify-between border-b bg-background py-4"
      }
    >
      <div className={"flex items-center gap-x-2"}>
        <Button onClick={() => router.back()} size={"icon"} variant={"ghost"}>
          <ChevronLeft className={"h-8 w-8"} />
        </Button>
        <BotAvatar src={persona.src} />
        <div className={"flex flex-col gap-y-1"}>
          <div className={"flex items-center gap-x-2"}>
            <p className={"font-bold"}>{persona.name}</p>
            <div className={"flex items-center text-xs text-muted-foreground"}>
              <MessageSquare className={"mr-1 h-3 w-3"} />
              {messageCount}
            </div>
          </div>
          <p className={"text-xs text-muted-foreground"}>
            {/*Created by {persona.userName}*/}
          </p>
        </div>
      </div>

      <ManagePersonaDropdown
        persona={persona}
        className={"rounded-xl bg-secondary p-2"}
        triggerIcon={<MoreVertical className={"h-5 w-5"} />}
      />
    </header>
  );
};

export default ChatHeader;
