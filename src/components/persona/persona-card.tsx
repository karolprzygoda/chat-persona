import { Ellipsis, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Persona } from "@prisma/client";
import ManagePersonaDropdown from "@/components/persona/manage-persona-dropdown";
import camelCase from "next/dist/build/webpack/loaders/css-loader/src/camelcase";

type PersonaCardProps = {
  item: Persona & {
    _count: { messages: number };
    category: {
      name: string;
    };
  };
};

const colors = {
  famousPeople: "bg-amber-500",
  moviesAndTv: "bg-lime-500",
  musicians: "bg-green-500",
  games: "bg-sky-500",
  animals: "bg-violet-500",
  philosophy: "bg-rose-500",
  scientists: "bg-pink-500",
} as const;

const PersonaCard = ({ item }: PersonaCardProps) => {
  const categoryKey = camelCase(item.category.name) as keyof typeof colors;
  return (
    <Card className={"relative cursor-pointer transition hover:opacity-80"}>
      <ManagePersonaDropdown
        persona={item}
        className={
          "absolute right-2 top-2 z-40 flex h-auto w-auto rounded-full border border-transparent bg-neutral-950 p-2 transition hover:border-primary hover:bg-neutral-950"
        }
        triggerIcon={<Ellipsis className={"h-4 w-4"} />}
      />
      <Link className={"flex h-full flex-col"} href={`/chat/${item.id}`}>
        <CardHeader className={"flex p-0 text-muted-foreground"}>
          <div className={"relative aspect-square w-full"}>
            <Image
              priority
              className={"rounded-t-xl"}
              sizes={"230px"}
              fill
              src={item.src}
              alt={`AI Persona of ${item.name}`}
            />
          </div>
        </CardHeader>
        <div className={"flex flex-1 flex-col justify-between"}>
          <div className={"p-4"}>
            <div className={"relative"}>
              <div
                className={"flex flex-wrap items-start justify-between gap-2"}
              >
                <div>
                  <p className={"font-bold"}>{item.name}</p>
                  <p className={"text-xs text-muted-foreground"}>
                    {item.description}
                  </p>
                </div>
                <Badge className={colors[categoryKey]}>
                  {item.category.name}
                </Badge>
              </div>
            </div>
            <p className={"mt-4 line-clamp-3 overflow-hidden text-sm"}>
              {item.seed}
            </p>
          </div>
          <CardFooter
            className={
              "flex items-center justify-between p-4 pt-0 text-xs text-muted-foreground"
            }
          >
            <p className={"lowercase"}>@{item.userName}</p>
            <div className={"flex items-center"}>
              <MessagesSquare className={"mr-2 h-3 w-3"} />
              {item._count.messages}
            </div>
          </CardFooter>
        </div>
      </Link>
    </Card>
  );
};

export default PersonaCard;
