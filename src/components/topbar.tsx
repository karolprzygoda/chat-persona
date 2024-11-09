import { Sparkles } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import MobileSidebar from "@/components/mobile-sidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Topbar = () => {
  return (
    <header
      className={
        "fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2"
      }
    >
      <nav className={"flex items-center"}>
        <MobileSidebar />
        <Link href={"/"}>
          <h1
            className={cn(
              "hidden text-xl font-bold text-primary md:block md:text-3xl",
              font.className,
            )}
          >
            Chat Persona
          </h1>
        </Link>
      </nav>
      <div className={"flex items-center gap-x-3"}>
        <ModeToggle />
        <Button variant={"premium"} size={"sm"}>
          Upgrade <Sparkles className={"h-4 w-4 fill-white text-white"} />
        </Button>
        <UserButton />
      </div>
    </header>
  );
};

export default Topbar;
