import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure the correct import

const { GEMINI_API_KEY } = process.env;

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request to extract the PDF buffer

    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("File not found in form data");
    }

    //method to get buffer from the file
    const buffer = await file.arrayBuffer();

    //convert buffer to text
    const fileText: string = Buffer.from(buffer).toString("utf-8");

    // Initialize the Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

    // Retrieve the generative model configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
      systemInstruction: `you are a project manager who have to create tasks based on the given pdf.`,
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

    // Send the extracted text to the generative model
    const result = await chatSession.sendMessage(fileText);
    // Return the AI-generated response
    return NextResponse.json({ response: JSON.parse(result.response.text()) });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
