"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
    ]);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });
    const data = await response.json();
    setMessages((messages) => [
      ...messages,
      { role: "assistant", content: data.message },
    ]);
  };
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
      <div className="flex justify-center items-center h-[100vh]">
        <div className="flex flex-col justify-between border-2 border-gray-400 h-[650px] w-[500px]">
          {messages.map((message, i) => (
            <div key={i} className="bg-primary rounded-3xl p-4 text-white m-3">
              {message.role === "assistant" ? "Assistant: " : "You: "}
              {message.content}
            </div>
          ))}
          <div className="flex gap-2 m-3">
            <Input
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
