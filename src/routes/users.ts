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
        Order_items: {
          select: {
            quantity: true,
            item: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json({ user: req.user, orders: allOrdersByUser });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error occured" });
  }
});
userRoute.patch("/:id", async (req: ExtendedRequest, res) => {
  if (!req.user) return res.status(404).json({ message: "Not logged in" });
  let newShippingAdress: string = req.body.shipping_adress;
  let user_id = req.params.id;
  if (req.user.id == user_id) {
    try {
      let numberId = +user_id;
      let updateUser = await prisma.users.update({
        where: {
          id: numberId,
        },
        data: {
          shipping_adress: newShippingAdress,
        },
      });
      return res
        .status(200)
        .json({ message: "User updated", user: updateUser });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Id given is different than your user_id" });
  }
});
userRoute.delete("/:id", async (req: ExtendedRequest, res) => {
  if (!req.user)
    return res.status(404).json({ message: "Need to be logged in" });
  if (req.user.id == req.params.id) {
    try {
      let deleteUser = await prisma.users.delete({
        where: {
          id: +req.params.id,
        },
      });
      return res.status(200).json({ message: "Account deleted" });
    } catch (err) {
      return res.status(400).json({ message: "Could not delete it" });
    }
  }
});
