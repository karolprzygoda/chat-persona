import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatFormProps = {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
  isLoading: boolean;
};

const ChatForm = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={"flex items-center gap-x-2 border-t py-4"}
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder={"Type a message"}
        className={"rounded-lg"}
      />
      <Button disabled={isLoading}>
        <Send className={"h-6 w-6"} />
      </Button>
    </form>
  );
};

export default ChatForm;
