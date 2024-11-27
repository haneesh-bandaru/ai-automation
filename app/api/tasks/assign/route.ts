import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { GEMINI_API_KEY } = process.env;

export async function POST(req: NextRequest) {
  try {
    const { tasks, employees } = await req.json();

    // Initialize the Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

    // Retrieve the generative model configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
      systemInstruction: `You are a project resource manager. Assign tasks to employees based on their skills and availability. Optimize for efficient task completion and skill matching.`,
    });

    // Define the generation configuration
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    // Start a chat session with the generative model
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Send the task and employee data to the generative model
    const result = await chatSession.sendMessage(
      `Assign these tasks to employees: ${JSON.stringify({ tasks, employees })}`
    );

    // Parse the AI-generated response
    const assignments = JSON.parse(result.response.text());

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error("Error assigning tasks:", error);
    return NextResponse.json(
      { error: "Error assigning tasks" },
      { status: 500 }
    );
  }
}
