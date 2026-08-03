import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);

// Socket.IO
connectToSocket(server);

// Middleware
app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

// Routes
app.use("/api/v1/users", userRoutes);

// Start Server
const start = async () => {
    try {
const connectionDb = await mongoose.connect(
  "mongodb+srv://thakurkatawa_db_user:%40Thakur123@cluster0.x7a1258.mongodb.net/videocall?retryWrites=true&w=majority&appName=Cluster0"
);
        console.log(`✅ MongoDB Connected: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(`🚀 Server running on port ${app.get("port")}`);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

start();