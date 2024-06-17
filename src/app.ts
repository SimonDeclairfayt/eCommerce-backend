import express from "express";
import { authRoute } from "./routes/authentication";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Salut");
  res.send("Hello World");
});

app.use("/auth", authRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
