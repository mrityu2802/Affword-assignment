import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
  connectDB();
});
