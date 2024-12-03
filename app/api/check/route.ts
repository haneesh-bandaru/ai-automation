// app/api/your-route/route.js
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Handle POST request
  // const data = (await req?.json()) || "No data received";
  return NextResponse.json(
    { message: "POST request successful" },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ message: "GET request successful" });
}
