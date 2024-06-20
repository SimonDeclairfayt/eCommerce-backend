import { Router } from "express";
import { prisma } from "../config/prismaConfig";
import uploadFile from "../utils/upload";
import upload from "../middleware/multer";
import { adminManageItems } from "./adminManageItems";
import { adminManageCollections } from "./adminManageCollections";

export const adminView = Router();

adminView.get("/", async (req, res) => {
  try {
    const items = await prisma.items.findMany({
      include: { collection: true, Items_img: true },
    });
    return res.send(items);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Could not find data" });
  }
});

// ROUTE TO GET AVAILABLE COLLECTIONS
adminView.get("/all/collections", async (req, res) => {
  try {
    const collections = await prisma.collections.findMany({
      orderBy: {
        date_created: "desc",
      },
    });
    return res.status(200).send(collections);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
});
//CRUD FOR ITEMS
adminView.use("/", adminManageItems);

//CRUD FOR COLLECTIONS
adminView.use("/", adminManageCollections);
