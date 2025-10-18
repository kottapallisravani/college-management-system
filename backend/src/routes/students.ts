import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { Student } from "../models/Student";

const router = Router();

// list with filters & pagination
router.get("/", authenticate, async (req, res) => {
    try {
        const { q, department, status, batchYear, semester, section, page = "1", limit = "10", sort = "-createdAt" } = req.query as any;
        const filter: any = {};
        if (department) filter.department = department;
        if (status) filter.status = status;
        if (batchYear) filter.batchYear = Number(batchYear);
        if (semester) filter.semester = Number(semester);
        if (section) filter.section = section;
        if (q) filter.$text = { $search: q };

        const pg = Math.max(parseInt(page as string) || 1, 1);
        const lim = Math.max(Math.min(parseInt(limit as string) || 10, 100), 1);

        const [items, total] = await Promise.all([
            Student.find(filter).sort(sort as string).skip((pg - 1) * lim).limit(lim),
            Student.countDocuments(filter),
        ]);

        res.json({ items, total, page: pg, pageSize: lim, totalPages: Math.ceil(total / lim) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// create
router.post("/", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const doc = new Student(req.body);
        await doc.save();
        res.status(201).json(doc);
    } catch (err: any) {
        console.error(err);
        if (err && err.code === 11000) return res.status(409).json({ error: "Duplicate value" });
        res.status(500).json({ error: "Server error" });
    }
});

router.put(":id", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
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
        const deleted = await Student.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
