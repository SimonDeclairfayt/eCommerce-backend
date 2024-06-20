import jwt from "jsonwebtoken";
import express from "express";
import { User, ExtendedRequest } from "../interface/userInterface";

export default async (
  req: ExtendedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  let jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set!");
  }
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!token || token == "null") {
    req.user = undefined;
    next();
  }
  try {
    if (typeof token === "string") {
      const jwtDecoded = jwt.verify(token, jwtSecret);
      if (jwtDecoded !== undefined) {
        req.user = jwtDecoded as User;
        next();
      }
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
