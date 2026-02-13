import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
//const express = require("express");
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(`Req Method Is ${req.method} & Req URL is ${req.url}`);
//     next();
// })
app.use("/api/users", rateLimiter, userRoutes);
app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {

        if (req.originalUrl.startsWith("/api")) {
            return res.status(404).json("API route not found!!!");
        }
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:5001");
    });
});