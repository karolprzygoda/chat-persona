import { ChangeEventHandler, FormEventHandler } from "react";

import { Button } from "@/components/ui/button";
import { AutoGrowingTextarea } from "@/components/auto-growing-textarea";
import { ArrowUp } from "lucide-react";

type ChatFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onStop: () => void;
};

const ChatForm = ({ input, onChange, onSubmit }: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={
        "mx-auto flex w-full max-w-[800px] justify-center gap-2 bg-background px-4"
      }
    >
      <div
        className={
          "shadow-alpha-400 relative z-10 w-full rounded-2xl border border-zinc-300 bg-muted shadow focus-within:ring-1 focus-within:ring-ring dark:border-transparent dark:border-zinc-700"
        }
      >
        <AutoGrowingTextarea
          value={input}
          maxHeight={200}
          onChange={onChange}
          className={
            "scrollbar-thin h-fit w-full resize-none rounded-xl border-0 bg-transparent p-3 pb-1.5 shadow-none outline-none !ring-0"
          }
          placeholder={"Write your message here..."}
        />
        <div className={"flex items-center justify-end gap-2 p-3"}>
          <Button
            disabled={input === ""}
            type={"submit"}
            aria-label={"Send message to the chatbot"}
            className={"h-fit rounded-full p-2"}
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
