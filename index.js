import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//MongoDB Connection
const mongoURI =
  "mongodb+srv://pdpatel267:8LeN6JeNStRoKMQG@guest-opinion-app.7sqon.mongodb.net";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/emails", emailRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
