import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import dbConnect from "@/app/lib/dbConnect";
import UserPayment from "@/app/models/UserPayments";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {

  
  const body = await request.text();
  
  // console.log(body)

  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      // guardar en una base de datos

      await dbConnect();

      await UserPayment.create({
        userName: checkoutSessionCompleted.metadata.userName,
        email: checkoutSessionCompleted.metadata.userEmail,
        canGetThePrompt: true,
      });

      // console.log(
      //   "Consultado producto con id",
      //   checkoutSessionCompleted.metadata.userName,
      //   checkoutSessionCompleted.metadata.userEmail
      // );

      // enviar un correo
      console.log({ checkoutSessionCompleted });
      break;
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
