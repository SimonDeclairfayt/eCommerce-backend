import { Router } from "express";
import { prisma } from "../config/prismaConfig";
import Stripe from "stripe";

export const ordersRoute = Router();

ordersRoute.post("/api/order", async (req, res) => {});
