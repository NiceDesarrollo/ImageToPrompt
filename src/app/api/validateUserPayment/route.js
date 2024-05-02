import dbConnect from "@/app/lib/dbConnect";
import UserPayment from "@/app/models/UserPayments";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.text();

  // Convertir la cadena de texto a un objeto
  const parsedBody = JSON.parse(body);

  // Acceder al valor de userEmail
  const userEmail = parsedBody.userEmail;
  try {
    await dbConnect();
    const userFound = await UserPayment.findOne({ email: userEmail });

    console.log(userFound)

    if (!userFound) {
      // console.log(
      //   "user: " + userEmail + "not found in userPayment" + userFound
      // );
      return NextResponse.json(
        {
          message:
            "user: " + userEmail + " not found in userPayment " + userFound,
        },
        { status: 200 }
      );
    } else {
      if (userFound.canGetThePrompt) {
        console.log("user: " + userEmail + " found in userPayment" + userFound);
        return NextResponse.json({ message: true }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "user without canGetThePrompt" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
    // You might want to send a response with an error status code
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
