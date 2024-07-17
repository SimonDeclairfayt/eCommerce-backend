import { Router } from "express";
import { prisma } from "../../config/prismaConfig";

export const adminManageOrders = Router();

adminManageOrders.get("/all", async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      orderBy: {
        order_date: "desc",
      },
    });
    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(404).json({ err: err });
  }
});
