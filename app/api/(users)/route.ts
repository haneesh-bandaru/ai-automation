import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
//   const projects = await Project.find();
//   res.json(projects);
return NextResponse.json({ message: "Hello from the users route!" });
}
