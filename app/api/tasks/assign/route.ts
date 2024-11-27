import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { tasks, employees } = await req.json();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a project resource manager. Assign tasks to employees based on their skills and availability. Optimize for efficient task completion and skill matching.",
        },
        {
          role: "user",
          content: `Assign these tasks to employees: ${JSON.stringify({
            tasks,
            employees,
          })}`,
        },
      ],
      model: "gpt-4-turbo-preview",
    });

    const assignments = JSON.parse(
      completion.choices[0].message.content || "[]"
    );

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error("Error assigning tasks:", error);
    return NextResponse.json(
      { error: "Error assigning tasks" },
      { status: 500 }
    );
  }
}
