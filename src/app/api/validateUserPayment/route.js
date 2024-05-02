import dbConnect from "@/app/lib/dbConnect";
import UserPayment from "@/app/models/UserPayments";
import { NextResponse } from "next/server";

export async function POST(request) {

  try {
    const body = await request.text();

    // Convertir la cadena de texto a un objeto
    const parsedBody = JSON.parse(body);

    // Acceder al valor de userEmail
    const userEmail = parsedBody.userEmail;
    

    await dbConnect();



    const userFound = await UserPayment.findOne({ email: userEmail });



    if (!userFound) {
      console.log("user not found in userPayment");
      return NextResponse.json({ message: false }, { status: 200 });
    } else {
      if (userFound.canGetThePrompt) {
        return NextResponse.json({ message: true }, { status: 200 });
      } else {
        return NextResponse.json({ message: false }, { status: 404 });
      }
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
    // You might want to send a response with an error status code
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
