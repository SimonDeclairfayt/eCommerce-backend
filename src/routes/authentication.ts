import { Router } from "express";
import { prisma } from "../config/prismaConfig";
import { encryptPassword, decryptPassword } from "../utils/encryptPassword";
import jwt from "jsonwebtoken";

let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set!");
}

export const authRoute = Router();

authRoute.post("/register", async (req, res) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const first_name: string = req.body.first_name;
    const last_name: string = req.body.last_name;
    const shipping_adress: string = req.body.shipping_adress;
    //CHECKING FOR MISSING VALUES
    if (!email || !password || !first_name || !last_name)
      return res.status(412).json({ message: "Missing values" });
    //CHECKING IF SOMEBODY ALREADY EXISTS FOR THIS EMAIL
    const existingEmailAccount = await prisma.users.count({
      where: {
        email: email,
      },
    });
    // IF NOBODY EXISTS WE CREATE A USER
    if (existingEmailAccount == 0) {
      let hashedPassword = await encryptPassword(password);
      let createdUser = await prisma.users.create({
        data: {
          email: email,
          password: hashedPassword,
          first_name: first_name,
          last_name: last_name,
          shipping_adress: shipping_adress ? shipping_adress : "",
        },
      });
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      //THIS IS IF AN EMAIL IS ALREADY IN USE
      return res.status(400).json({ message: "Email already in use" });
    }
  } catch (err) {
    console.error(err);
  }
});

authRoute.post("/login", async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  // CHECK FOR A MISSING VALUE
  if (!email || !password)
    return res.status(412).json({ message: "Missing values" });
  // CHECKING IF A USER WITH THAT EMAIL EXISTS
  const existingEmailAccount = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  // IF HE DOES NOT EXIST RETURN 404
  if (!existingEmailAccount) {
    return res.status(404).json({ message: "No account with that email" });
  }
  const comparePassword = await decryptPassword(
    password,
    existingEmailAccount.password
  );
  //HANDLING WRONG PASSWORD/EMAIL COMBINATION
  if (!comparePassword)
    return res
      .status(412)
      .json({ message: "Wrong Email or password combination" });
  else {
    let TokenPayload = {
      id: existingEmailAccount?.id?.toString(),
      email: existingEmailAccount.email,
      first_name: existingEmailAccount.first_name,
      last_name: existingEmailAccount.last_name,
      shipping_adress: existingEmailAccount.shipping_adress,
      is_admin: existingEmailAccount.is_admin,
    };
    let Token = jwt.sign(TokenPayload, jwtSecret, { expiresIn: "3h" });
    return res.status(200).json({ accessToken: Token });
  }
});

// authRoute.post("/admin/register", async (req, res) => {
//   const email: string = req.body.email;
//   const password: string = req.body.password;
//   const first_name: string = req.body.first_name;
//   const last_name: string = req.body.last_name;
//   const shipping_adress: string = req.body.shipping_adress;

//   let hashedPassword = await encryptPassword(password);
//   let createdUser = await prisma.users.create({
//     data: {
//       email: email,
//       password: hashedPassword,
//       first_name: first_name,
//       last_name: last_name,
//       shipping_adress: shipping_adress ? shipping_adress : "",
//       is_admin: true,
//     },
//   });
//   return res.status(200).json({ message: "User registered successfully" });
// });
