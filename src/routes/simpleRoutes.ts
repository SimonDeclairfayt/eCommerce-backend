import { Router } from "express";
import { prisma } from "../config/prismaConfig";

export const simpleRoute = Router();

simpleRoute.get("/items", async (req, res) => {
  try {
    const items = await prisma.items.findMany({
      include: {
        collection: { select: { name: true } },
        Items_img: { select: { id: true, image_url: true, is_main: true } },
      },
      orderBy: {
        date_created: "desc",
      },
    });
    let productTypeCounts = await prisma.items.groupBy({
      by: ["product_type"],
      _count: {
        product_type: true,
      },
    });

    return res.json({
      Objets: items,
      ProductType: productTypeCounts.map((result) => ({
        product_type: result.product_type,
        count: result._count.product_type,
      })),
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Could not find data" });
  }
});

simpleRoute.get("/collections", async (req, res) => {
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
