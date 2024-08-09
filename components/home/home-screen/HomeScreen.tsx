"use client";

import { createChatResult } from "@/app/auth/callback/actions";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createChatResult"],
    mutationFn: async () =>
      createChatResult({ message: completion, title: input }),
    onSuccess: () => {
      alert("Chat result saved!");
        queryClient.invalidateQueries({ queryKey: ["createChatResult"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <main>
      <Nav />
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

          <Button disabled={isPending} onClick={() => mutate()}>
            {isPending ? "Saving Result..." : "Save Result"}
          </Button>
        </form>
        <output>Completion result: {completion}</output>
      </div>
    </main>
  );
}
