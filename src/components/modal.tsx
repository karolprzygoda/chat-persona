"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import * as React from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <AlertDialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        className={
          "h-screen min-w-full border-0 md:h-auto md:min-w-0 md:max-w-lg md:border"
        }
      >
        <AlertDialogCancel className="absolute right-4 top-4 rounded-sm border-0 bg-transparent opacity-70 shadow-none ring-offset-card transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
        <AlertDialogHeader>
          <VisuallyHidden>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </VisuallyHidden>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
