import { Router } from "express";
import { prisma } from "../config/prismaConfig";
import Stripe from "stripe";
import { User, ExtendedRequest } from "../interface/userInterface";

const stripe = new Stripe(
  process.env.STRIPE_APIKEY ? process.env.STRIPE_APIKEY : ""
);

export const ordersRoute = Router();

ordersRoute.post("/create-checkout-session", async (req, res) => {
  const data = req.body.data;
  const lineItems = data.map(
    (item: { id: number; quantity: number; price: number; name: string }) => {
      return {
        price_data: {
          currency: "eur",
          unit_amount: item.price,
          product_data: {
            name: item.name,
          },
        },
        quantity: item.quantity,
      };
    }
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: "https://main--ceramiks.netlify.app/success",
    cancel_url: "https://main--ceramiks.netlify.app/cancel",
  });
  res.status(200).json({ sessionId: session.url });
});

ordersRoute.post("/completed", async (req: ExtendedRequest, res) => {
  const data = req.body.data;
  const email: string = req.body.email;
  const first_name: string = req.body.first_name;
  const last_name: string = req.body.last_name;
  const shipping_adress: string = req.body.shipping_adress;
  const user_id: any = req.body.user_id ? Number(req.body.user_id) : null;
  if (!email || !first_name || !last_name) {
    return res.status(412).json({ message: "Missing values" });
  }

  let totalPrice: number = 0;
  let createdOrder;
  for (let item of data) {
    totalPrice += item.price * item.quantity;
  }
  try {
    createdOrder = await prisma.orders.create({
      data: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        shipping_adress: shipping_adress,
        total_price: totalPrice,
        order_status: "En Cours",
        user_id: user_id,
      },
    });
    for (let item of data) {
      let createOrderItem = await prisma.order_items.create({
        data: {
          order_id: createdOrder.id,
          quantity: item.quantity,
          item_id: item.id,
        },
      });
      let reduceStock = await prisma.items.update({
        where: {
          id: item.id,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }
    return res.status(200).json({ Order: createdOrder });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errMessage: err });
  }
});
