import { Router } from "express";
import { prisma } from "../config/prismaConfig";
import uploadFile from "../utils/upload";
import upload from "../middleware/multer";

export const adminManageItems = Router();

adminManageItems.post(
  "/add/items",
  upload.single("image"),
  async (req, res) => {
    const collection_id: number = Number(req.body.collection_id);
    const name: string = req.body.name;
    const description: string = req.body.description;
    const product_type: string = req.body.product_type;
    const stock: number = Number(req.body.stock);
    const price: number = Number(req.body.price);
    if (
      !collection_id ||
      !name ||
      !description ||
      !product_type ||
      !stock ||
      !price
    )
      return res.status(412).json({ message: "Missing values" });
    let createdItem = await prisma.items.create({
      data: {
        collection_id: collection_id,
        name: name,
        description: description,
        product_type: product_type,
        stock: stock,
        price: price,
      },
    });
    if (req.file) {
      let mainImgUrl = await uploadFile(req.file);
      if (typeof mainImgUrl === "string") {
        await prisma.items_img.create({
          data: {
            image_url: mainImgUrl,
            is_main: true,
            item_id: createdItem.id,
          },
        });
        return res.status(200).json({
          message: "Item created successfully",
          itemId: createdItem.id,
        });
      }
    }
  }
);

adminManageItems.post(
  "/add/itemsimg/:id",
  upload.array("images", 2),
  async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ message: "No images uploaded" });
      }
      const uploadedImages: string[] = [];
      const files = req.files as Express.Multer.File[];
      for (const file of files) {
        if (file) {
          const uploadedImagesUrl = await uploadFile(file);
          if (typeof uploadedImagesUrl === "string") {
            await prisma.items_img.create({
              data: {
                image_url: uploadedImagesUrl,
                is_main: false,
                item_id: +req.params.id,
              },
            });
          }
        }
      }
      return res.status(200).json({ message: "Images uploaded" });
    } catch (err) {
      console.error(err);
      return res.status(404).json({ message: "Something went wrong" });
    }
  }
);

adminManageItems.patch(
  "/patch/itemsimg/:id",
  upload.single("image"),
  async (req, res) => {
    const isMain: boolean = req.body.is_main;
    if (req.file) {
      let newImageUrl = await uploadFile(req.file);
    }
  }
);
