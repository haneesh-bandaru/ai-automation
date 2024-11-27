import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Example logic for the GET request
  const response = { message: `Success${process.env.GEMINI_API_KEY}` };

  // Make sure to return the NextResponse object correctly
  return NextResponse.json(response);
}
