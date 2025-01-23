"use client";

import BotAvatar from "@/components/chat/bot-avatar";
import { Message, ToolInvocation } from "ai";
import { MemoizedMarkdown } from "@/components/markdown/memoized-markdown";
import { AnimatePresence, motion } from "motion/react";

export type ChatMessageProps = {
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;
  message: Message;
  src: string;
};

export const ChatMessage = ({
  message,
  src,
  addToolResult,
}: ChatMessageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className={"flex w-full flex-col"}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        {message.role === "user" ? (
          <div
            className={
              "self-end rounded-xl bg-primary px-3 py-2 text-background"
            }
          >
            {message.content}
          </div>
        ) : (
          <div className={"flex gap-4"}>
            <div
              className={
                "flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 ring-1 ring-zinc-700 dark:bg-[#1e1e1e]"
              }
            >
              <BotAvatar className={"h-full w-full"} src={src} />
            </div>
            <div>
              <MemoizedMarkdown id={message.id} content={message.content} />
              {message.toolInvocations?.map(
                (toolInvocation: ToolInvocation) => {
                  const toolCallId = toolInvocation.toolCallId;
                  if (toolInvocation.toolName === "askForConfirmation") {
                    return (
                      <div
                        key={toolCallId}
                        className="flex flex-col gap-2 text-gray-500"
                      >
                        {toolInvocation.args.message}
                        <div className="flex gap-2">
                          {"result" in toolInvocation ? (
                            <b>{toolInvocation.result}</b>
                          ) : (
                            <>
                              <button
                                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                onClick={() =>
                                  addToolResult({
                                    toolCallId,
                                    result: "Yes, confirmed.",
                                  })
                                }
                              >
                                Yes
                              </button>
                              <button
                                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                                onClick={() =>
                                  addToolResult({
                                    toolCallId,
                                    result: "No, denied",
                                  })
                                }
                              >
                                No
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return "result" in toolInvocation ? (
                    toolInvocation.toolName === "getWeatherInformation" ? (
                      <div
                        key={toolCallId}
                        className="flex flex-col gap-2 rounded-lg bg-blue-400 p-4"
                      >
                        <div className="flex flex-row items-center justify-between">
                          <div className="text-4xl font-medium text-blue-50">
                            {toolInvocation.result.value}°
                            {toolInvocation.result.unit === "celsius"
                              ? "C"
                              : "F"}
                          </div>

                          <div className="h-9 w-9 flex-shrink-0 rounded-full bg-amber-400" />
                        </div>
                        <div className="flex flex-row justify-between gap-2 text-blue-50">
                          {toolInvocation.result.weeklyForecast.map(
                            (forecast: any) => (
                              <div
                                key={forecast.day}
                                className="flex flex-col items-center"
                              >
                                <div className="text-xs">{forecast.day}</div>
                                <div>{forecast.value}°</div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ) : toolInvocation.toolName === "getLocation" ? (
                      <div
                        key={toolCallId}
                        className="rounded-lg bg-gray-100 p-4 text-gray-500"
                      >
                        User is in {toolInvocation.result}.
                      </div>
                    ) : (
                      <div key={toolCallId} className="text-gray-500">
                        Tool call {`${toolInvocation.toolName}: `}
                        {toolInvocation.result}
                      </div>
                    )
                  ) : (
                    <div key={toolCallId} className="text-gray-500">
                      Calling {toolInvocation.toolName}...
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
