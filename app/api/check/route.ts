import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  return NextResponse.json(
    { message: "Check route is working." },
    { status: 200 }
  );
}
