import express from "express";
import { ExtendedRequest } from "../interface/userInterface";

export default async (
  req: ExtendedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user) {
    if (req.user.is_admin == true) {
      next();
    } else return res.status(401).json({ message: "Not an admin" });
  } else if (!req.user)
    return res.status(403).json({ message: "Need to login" });
};
