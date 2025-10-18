import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { Announcement } from "../models/Announcement";

const router = Router();

router.get("/", authenticate, async (req, res) => {
    try {
        const { q, published, page = "1", limit = "10", sort = "-createdAt" } = req.query as any;
        const filter: any = {};
        if (typeof published !== "undefined") filter.published = published === "true";
        if (q) filter.$text = { $search: q };

        const pg = Math.max(parseInt(page as string) || 1, 1);
        const lim = Math.max(Math.min(parseInt(limit as string) || 10, 100), 1);
        const [items, total] = await Promise.all([
            Announcement.find(filter).sort(sort as string).skip((pg - 1) * lim).limit(lim),
            Announcement.countDocuments(filter),
        ]);
        res.json({ items, total, page: pg, pageSize: lim, totalPages: Math.ceil(total / lim) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const body = { ...req.body, createdBy: req.user?.id };
        const doc = new Announcement(body);
        await doc.save();
        res.status(201).json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.put(":id", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Not found" });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete(":id", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Announcement.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
