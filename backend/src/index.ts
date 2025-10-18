import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import messRoutes from "./routes/mess";
import timetableRoutes from "./routes/timetable";
import studentsRoutes from "./routes/students";
import facultyRoutes from "./routes/faculty";
import coursesRoutes from "./routes/courses";
import announcementsRoutes from "./routes/announcements";
import attendanceRoutes from "./routes/attendance";
import examsRoutes from "./routes/exams";
import feesRoutes from "./routes/fees";
import marksRoutes from "./routes/marks";
import profileRoutes from "./routes/profile";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
    },
});

// simple socket auth example (optional)
io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
    socket.on("disconnect", () => console.log("Socket disconnected", socket.id));
});

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/learn-central";
const PORT = Number(process.env.PORT || 4000);

mongoose
    .connect(MONGO)
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.error("Mongo error", err));

app.use("/api/auth", authRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exams", examsRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/profile", profileRoutes);

// simple health check
app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// emit events when items are inserted could be added in routes; also expose io
app.locals.io = io;
server.listen({ port: PORT, host: '0.0.0.0' }, () => console.log(`Server listening on 0.0.0.0:${PORT}`));
