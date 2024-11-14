"use client";

import { Message, Persona } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BotAvatar from "@/components/bot-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";
import { useToast } from "@/hooks/use-toast";

type ChatHeaderProps = {
  persona: Persona & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

const ChatHeader = ({ persona }: ChatHeaderProps) => {
  const router = useRouter();
  const user = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      toast({
        description: "Success.",
      });
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <header
      className={"flex w-full items-center justify-between border-b pb-4"}
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
              {persona._count.messages}
            </div>
          </div>
          <p className={"text-xs text-muted-foreground"}>
            Created by {persona.userName}
          </p>
        </div>
      </div>
      {user?.id === persona.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"end"}>
            <DropdownMenuItem>
              <Edit className={"mr-2 h-4 w-4"} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash2 className={"mr-2 h-4 w-4"} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default ChatHeader;
