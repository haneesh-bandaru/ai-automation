import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Example logic for the GET request
  const response = { message: `Success and ${process.env.CHECK}` };

  // Make sure to return the NextResponse object correctly
  return NextResponse.json(response);
}
