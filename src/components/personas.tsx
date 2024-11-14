import { Category, Persona } from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Ellipsis, MessagesSquare, UserPen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletePersonaButton from "@/components/delete-persona-button";

type PersonasProps = {
  data: (Persona & {
    _count: { messages: number };
  } & {
    category: Category;
  })[];
};

const Personas = ({ data }: PersonasProps) => {
  if (data.length === 0) {
    return (
      <div
        className={
          "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-5"
        }
      >
        <div className={"relative h-72 w-72"}>
          <Image fill src={"/empty.svg"} alt={"Empty"} />
        </div>
        <p className={"text-2xl text-muted-foreground"}>No Personas found</p>
      </div>
    );
  }

  return (
    <div
      className={
        "grid gap-2 pb-10 min-[490px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-6"
      }
    >
      {data.map((item) => (
        <Card
          className={"relative cursor-pointer transition hover:opacity-80"}
          key={item.id}
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              className={
                "absolute right-2 top-2 z-40 flex h-auto w-auto rounded-full border border-transparent bg-neutral-950 p-2 transition hover:border-primary hover:bg-neutral-950"
              }
            >
              <Ellipsis className={"h-4 w-4"} />
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
                <DeletePersonaButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={`/chat/${item.id}`}>
            <CardHeader className={"flex p-0 text-muted-foreground"}>
              <div className={"relative aspect-square w-full"}>
                <Image
                  className={"rounded-t-xl"}
                  fill
                  src={item.src}
                  alt={`AI Persona of ${item.name}`}
                />
              </div>
            </CardHeader>
            <div className={"p-4"}>
              <div className={"relative"}>
                <div className={"flex justify-between"}>
                  <p className={"font-bold"}>{item.name}</p>
                  <Badge>{item.category.name}</Badge>
                </div>
                <p className={"text-xs text-muted-foreground"}>
                  {item.description}
                </p>
              </div>
              <p className={"mt-4 line-clamp-3 overflow-hidden text-sm"}>
                {item.seed}
              </p>
            </div>
            <CardFooter
              className={
                "flex items-center justify-between p-4 text-xs text-muted-foreground"
              }
            >
              <p className={"lowercase"}>@{item.userName}</p>
              <div className={"flex items-center"}>
                <MessagesSquare className={"mr-2 h-3 w-3"} />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Personas;
