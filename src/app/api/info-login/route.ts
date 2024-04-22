import dbConnect from "@/app/lib/dbConnect";
import LoginInfo, { ILoginInfo } from "@/app/models/loginInfo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse the request body as JSON
  const data = await request.json();
  const { name, email, provider } = data;

  // Continue with your existing logic...
  try {
    await dbConnect();

    const loginInfo: ILoginInfo = await LoginInfo.create({
      name,
      email,
      provider: provider,
    });
  } catch (error: any) {
    // Return the error message with a status code of 400
    return NextResponse.json({ message: error }, { status: 400 });
  }

  return NextResponse.json({ message: data }, { status: 200 });
}
