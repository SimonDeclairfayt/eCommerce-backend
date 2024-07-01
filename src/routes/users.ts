import { Router } from "express";
import { prisma } from "../config/prismaConfig";
import { User, ExtendedRequest } from "../interface/userInterface";

export const userRoute = Router();

userRoute.get("/", async (req: ExtendedRequest, res) => {
  if (!req.user) return res.status(404).json({ message: "Need to login" });
  try {
    const allOrdersByUser = await prisma.orders.findMany({
      where: {
        user_id: +req.user.id,
      },
      include: {
        Order_items: true,
      },
    });
    return res.status(200).json({ user: req.user, orders: allOrdersByUser });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error occured" });
  }
});
