import { ReactNode } from "react";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return <div className={"mx-auto h-full w-full max-w-3xl"}>{children}</div>;
};

export default ChatLayout;
