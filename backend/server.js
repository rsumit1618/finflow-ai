import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./src/routes/healthRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api", healthRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
