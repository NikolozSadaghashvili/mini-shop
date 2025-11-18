import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import authRouter from "./routes/auth.router.js";
import productsRouter from "./routes/products.router.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello World" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server in running on PORT: ${PORT}`);
});
