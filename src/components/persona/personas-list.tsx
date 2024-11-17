import { Persona } from "@prisma/client";
import Image from "next/image";
import PersonaCard from "@/components/persona/persona-card";

type PersonasProps = {
  data: (Persona & {
    _count: { messages: number };
    category: {
      name: string;
    };
  })[];
};

const PersonasList = ({ data }: PersonasProps) => {
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
        "grid gap-4 pb-10 min-[425px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      }
    >
      {data.map((item) => (
        <PersonaCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PersonasList;
