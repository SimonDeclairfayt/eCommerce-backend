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

adminManageOrders.patch("/patch/:id", async (req, res) => {
  const status: string = req.body.order_status;
  const id: number = +req.params.id;
  try {
    const update = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        order_status: status,
      },
    });
    return res.status(200).json({ order: update });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong with updating" });
  }
});
