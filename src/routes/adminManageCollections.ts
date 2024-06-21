import { Router } from "express";
import { prisma } from "../config/prismaConfig";
import uploadFile from "../utils/upload";
import upload from "../middleware/multer";

export const adminManageCollections = Router();

//CREATING A COLLECTION
adminManageCollections.post("/add/collection", async (req, res) => {
  const collectionName: string = req.body.name;
  //CHECK IF ALREADY EXISTS
  const checkIfAlreadyExists = await prisma.collections.findFirst({
    where: {
      name: collectionName,
    },
  });
  // IF SO WE QUIT THE FUNCTION
  if (checkIfAlreadyExists) {
    return res.status(409).json({ message: "Already Exists" });
  } else {
    //OR WE TRY TO CREATE THE COLLECTION
    try {
      await prisma.collections.create({
        data: {
          name: collectionName,
        },
      });
      return res
        .status(200)
        .json({ message: "Collection created successfully" });
    } catch (err) {
      // JUST IN CASE SOMETHING GOES WRONG HERE
      console.error("Can't save the collection" + err);
      return res.status(400).json({ message: err });
    }
  }
});

//FAIRE PATCH ET DELETE
adminManageCollections.patch("/patch/collection/:id", async (req, res) => {
  const collectionName: string = req.body.name;
  const id: number = +req.params.id;
  try {
    const updateCollection = await prisma.collections.update({
      where: {
        id: id,
      },
      data: {
        name: collectionName,
      },
    });
    return res.status(200).json({ message: "Collection updated" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating the collection name", Error: err });
  }
});
