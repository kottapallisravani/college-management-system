import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

import dotenv from "dotenv";
dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

router.post("/signup", async (req, res) => {
    try {
        let { email, password, role } = req.body as { email?: string; password?: string; role?: string };
        email = (email || "").toString().trim().toLowerCase();
        password = (password || "").toString();
        role = (role || "").toString();

        if (!email || !password || !role) {
            return res.status(400).json({ error: "Missing fields" });
        }

        if (!["admin", "faculty", "student"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: "User exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hash, role });
        await user.save();

        res.json({ success: true });
    } catch (err: any) {
        console.error("Signup error:", err);
        // handle duplicate key thrown by mongoose unique index
        if (err && err.code === 11000) {
            return res.status(409).json({ error: "User exists" });
        }
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password, role } = req.body as { email?: string; password?: string; role?: string };
        email = (email || "").toString().trim().toLowerCase();
        password = (password || "").toString();
        role = (role || "").toString();

        if (!email || !password || !role) return res.status(400).json({ error: "Missing fields" });

        if (!["admin", "faculty", "student"].includes(role)) return res.status(400).json({ error: "Invalid role" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        // enforce role match strictly
        if (user.role !== role) return res.status(401).json({ error: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
