import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { Exam } from "../models/Exam";

const router = Router();

router.get("/", authenticate, async (req, res) => {
    try {
        const { department, semester, type, startDate, endDate, status, page = "1", limit = "10", sort = "date" } = req.query as any;
        const filter: any = {};
        if (department) filter.department = department;
        if (semester) filter.semester = Number(semester);
        if (type && type !== "all") filter.type = type;
        if (status && status !== "all") filter.status = status;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate as string);
            if (endDate) filter.date.$lte = new Date(endDate as string);
        }
        const pg = Math.max(parseInt(page as string) || 1, 1);
        const lim = Math.max(Math.min(parseInt(limit as string) || 10, 100), 1);
        const [items, total] = await Promise.all([
            Exam.find(filter).sort(sort as string).skip((pg - 1) * lim).limit(lim).populate("courseId", "code title"),
            Exam.countDocuments(filter),
        ]);
        res.json({ items, total, page: pg, pageSize: lim, totalPages: Math.ceil(total / lim) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const doc = new Exam(req.body);
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
        const updated = await Exam.findByIdAndUpdate(id, req.body, { new: true });
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
        const deleted = await Exam.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
