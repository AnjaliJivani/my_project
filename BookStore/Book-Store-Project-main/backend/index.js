import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js"; // Ensure you have PORT set correctly
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors({
  origin: ["http://localhost:5173", "https://localhost:5173"], // Allow both HTTP and HTTPS
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));


app.get("/", (request, response) => {
  return response.status(234).send("Welcome to MERN Stack Book Shop");
});

app.use("/books", booksRoute);

// MongoDB connection string
const mongoDBURL = process.env.MONGODB_URI || 'mongodb+srv://Anjali:Mongodb123@cluster0.7iqz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("App connected to db");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
