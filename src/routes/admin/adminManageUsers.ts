import { Router } from "express";
import { prisma } from "../../config/prismaConfig";

export const adminManageUser = Router();

adminManageUser.get("/all", async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json({ users: users });
  } catch (err) {
    return res.status(404).json({ message: "Can't find users" });
  }
});

adminManageUser.delete("/:id", async (req, res) => {
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
});
