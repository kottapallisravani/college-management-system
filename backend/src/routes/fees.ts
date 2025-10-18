import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { Fee } from "../models/Fee";

const router = Router();

router.get("/", authenticate, async (req, res) => {
    try {
        const { studentId, semester, status, page = "1", limit = "10", sort = "-date" } = req.query as any;
        const filter: any = {};
        if (studentId) filter.studentId = studentId;
        if (semester && semester !== "all") filter.semester = Number(semester);
        if (status && status !== "all") filter.status = status;
        const pg = Math.max(parseInt(page as string) || 1, 1);
        const lim = Math.max(Math.min(parseInt(limit as string) || 10, 100), 1);
        const [items, total] = await Promise.all([
            Fee.find(filter).sort(sort as string).skip((pg - 1) * lim).limit(lim).populate("studentId", "rollNo name"),
            Fee.countDocuments(filter),
        ]);
        res.json({ items, total, page: pg, pageSize: lim, totalPages: Math.ceil(total / lim) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/", authenticate, async (req, res) => {
    try {
        // Admin can create; students could also add payment intents, but for now allow admin only if desired
        if (req.user?.role === "student") return res.status(403).json({ error: "Forbidden" });
        const doc = new Fee(req.body);
        await doc.save();
        res.status(201).json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/:id", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Fee.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Not found" });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:id", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Fee.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
