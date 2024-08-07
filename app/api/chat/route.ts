import { NextResponse } from "next/server";
import OpenAI from "openai";

// request is what you send, response is what you get
export async function POST(req: Request) {
  const openai = new OpenAI();
  const data = await req.json();
  console.log(data);

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
      },
      { role: "user", content: "Where was it played?" },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  return NextResponse.json({ message: "hello from server" }, { status: 200 });
}
