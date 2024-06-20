import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
//IMPORTING MY ROUTES
import { authRoute } from "./routes/authentication";
import { productsRoute } from "./routes/products";
import { adminView } from "./routes/adminView";
//IMPORTING MY MIDDLEWARE
import verifyJWT from "./middleware/verifyJWT";
import verifyAdminRights from "./middleware/verifyAdminRights";
import { adminManageCollections } from "./routes/adminManageCollections";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Salut");
  res.send("Hello World");
});
// LOGIN/REGISTER ROUTE
app.use("/auth", authRoute);

// GETTING THE JWT AND ASSIGNING IT TO REQ.USER
app.use(verifyJWT);

//ROUTE TO GET THE PRODUCTS
app.use("/api", productsRoute);

//NEED TO BE AN ADMIN TO BE THERE
app.use(verifyAdminRights);

//ADMIN ROUTES
//GET ALL VALUES
app.use("/admin", adminView);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
