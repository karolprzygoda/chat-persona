"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const DeletePersonaButton = () => {
  return (
    <Button
      variant={"ghost"}
      className={
        "h-auto w-full justify-start p-0 text-red-600 hover:text-red-600"
      }
    >
      <Trash2 />
      Delete
    </Button>
  );
};

export default DeletePersonaButton;
