import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  
  const body = await request.json();


  // Define el precio correcto para tu producto
  const correctPrice = 1000; // Reemplaza esto con el precio correcto de tu producto

  // Comprueba si el precio enviado por el cliente es correcto
  if (body.price !== correctPrice) {
    return NextResponse.json({ error: "Incorrect price" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    success_url: `http://localhost:3000/dashboard`,
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: body.name,
            images: [body.image],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userName: body.user.name,
      userEmail: body.user.email,
    },
    mode: "payment",
  });

  return NextResponse.json(session);
}
