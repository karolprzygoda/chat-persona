"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={"flex h-screen w-screen flex-col items-center justify-center"}
    >
      <div className={"mb-10 flex h-12 items-center gap-6"}>
        <CircleX size={32} className={"text-red-500"} />
        <Separator orientation={"vertical"} />
        <h2 className={"text-4xl"}>Something went wrong!</h2>
      </div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
