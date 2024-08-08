'use client'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useCompletion } from "ai/react";

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({ api: "/api/completion" });

  return (
    <main>
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2 items-center">
          <div>AI Chat</div>
        </div>

        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      </div>
      <Separator className="shadow" />
      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-8">
          <label className="grow">
            <input
              className="w-full max-w-md bottom-0 border border-gray-300 rounded shadow-xl p-2"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything..."
            />
          </label>
          <Button type="button" onClick={stop}>
            Stop
          </Button>
          <Button disabled={isLoading} type="submit">
            Send
          </Button>
        </form>
        <output>Completion result: {completion}</output>
      </div>
    </main>
  );
}
