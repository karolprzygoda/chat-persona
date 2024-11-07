import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  console.log("Hello server");

  return (
    <nav
      className={
        "fixed z-50 flex w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2"
      }
    >
      <div className={"flex items-center"}>
        <Menu className={"block md:hidden"} />
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
      </div>
      <div className={"flex items-center gap-x-3"}>
        <ModeToggle />
        <Button variant={"premium"} size={"sm"}>
          Upgrade <Sparkles className={"h-4 w-4 fill-white text-white"} />
        </Button>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
