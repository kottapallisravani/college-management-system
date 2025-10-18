import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { Mark } from "../models/Mark";

const router = Router();

router.get("/", authenticate, async (req, res) => {
    try {
        const { studentId, courseId, examType, semester, status, page = "1", limit = "10", sort = "-updatedAt" } = req.query as any;
        const filter: any = {};
        if (studentId) filter.studentId = studentId;
        if (courseId) filter.courseId = courseId;
        if (examType) filter.examType = examType;
        if (semester) filter.semester = Number(semester);
        if (status) filter.status = status;
        const pg = Math.max(parseInt(page as string) || 1, 1);
        const lim = Math.max(Math.min(parseInt(limit as string) || 10, 100), 1);
        const [items, total] = await Promise.all([
            Mark.find(filter).sort(sort as string).skip((pg - 1) * lim).limit(lim).populate("studentId", "rollNo name").populate("courseId", "code title"),
            Mark.countDocuments(filter),
        ]);
        res.json({ items, total, page: pg, pageSize: lim, totalPages: Math.ceil(total / lim) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Faculty/admin can submit marks
router.post("/", authenticate, async (req, res) => {
    try {
        if (req.user?.role === "student") return res.status(403).json({ error: "Forbidden" });
        const doc = new Mark({ ...req.body, createdBy: req.user?.id });
        await doc.save();
        res.status(201).json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/:id", authenticate, async (req, res) => {
    try {
        if (req.user?.role === "student") return res.status(403).json({ error: "Forbidden" });
        const { id } = req.params;
        const updated = await Mark.findByIdAndUpdate(id, req.body, { new: true });
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
        const deleted = await Mark.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
