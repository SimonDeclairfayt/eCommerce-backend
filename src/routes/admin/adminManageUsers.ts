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
  const id = req.params.id;
  try {
  } catch (err) {
    return res.send(err);
  }
});
