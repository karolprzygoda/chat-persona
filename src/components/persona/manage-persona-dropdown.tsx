"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, UserPen } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { deletePersonaAction } from "@/actions/actions";
import useUser from "@/hooks/useUser";
import { Persona } from "@prisma/client";

type ManagePersonaDropdownProps = {
  triggerIcon: ReactNode;
  className?: string;
  persona: Persona;
};

export const ManagePersonaDropdown = ({
  triggerIcon,
  className,
  persona,
}: ManagePersonaDropdownProps) => {
  const { toast } = useToast();
  const user = useUser();

  const onDelete = async (id: string) => {
    const { title, description, variant } = await deletePersonaAction(id);

    toast({
      title,
      description,
      variant,
    });
  };

  if (!user || user.id !== persona.userId) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger title={"Manage Persona"} className={className}>
        {triggerIcon}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Manage Persona</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className={"flex w-full items-center gap-2"} href={"/"}>
            <UserPen size={16} />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => onDelete(persona.id)}
            variant={"ghost"}
            className={
              "h-auto w-full justify-start p-0 text-red-600 hover:text-red-600"
            }
          >
            <Trash2 />
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManagePersonaDropdown;
