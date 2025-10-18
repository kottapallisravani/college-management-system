import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { Profile } from "../models/Profile";

const router = Router();

// Get my profile
router.get("/me", authenticate, async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user!.id });
        res.json(profile || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Upsert my profile
router.put("/me", authenticate, async (req, res) => {
    try {
        const data = { ...req.body, userId: req.user!.id };
        const updated = await Profile.findOneAndUpdate({ userId: req.user!.id }, data, { new: true, upsert: true });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: get profile by user id
router.get("/:userId", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOne({ userId });
        if (!profile) return res.status(404).json({ error: "Not found" });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: update profile by user id
router.put("/:userId", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { userId } = req.params;
        const updated = await Profile.findOneAndUpdate({ userId }, req.body, { new: true, upsert: true });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
