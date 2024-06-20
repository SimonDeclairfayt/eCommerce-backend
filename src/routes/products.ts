import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productsRoute = Router();

productsRoute.get("/", async (req, res) => {
  //RENVOYER TOUTES LES INFOS PAR + RéCENT A MOINS RéCENT
});
