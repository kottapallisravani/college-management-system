import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { Attendance } from "../models/Attendance";

const router = Router();

// GET attendance with filters and pagination
router.get("/", authenticate, async (req, res) => {
    try {
        const { studentId, courseId, department, section, semester, startDate, endDate, status, page = "1", limit = "10", sort = "-date" } = req.query as any;
        const filter: any = {};
        if (studentId) filter.studentId = studentId;
        if (courseId) filter.courseId = courseId;
        if (department) filter.department = department;
        if (section) filter.section = section;
        if (semester) filter.semester = Number(semester);
        if (status) filter.status = status;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate as string);
            if (endDate) filter.date.$lte = new Date(endDate as string);
        }

        const pg = Math.max(parseInt(page as string) || 1, 1);
        const lim = Math.max(Math.min(parseInt(limit as string) || 10, 100), 1);

        const [items, total] = await Promise.all([
            Attendance.find(filter).sort(sort as string).skip((pg - 1) * lim).limit(lim).populate("studentId", "rollNo name").populate("courseId", "code title"),
            Attendance.countDocuments(filter),
        ]);
        res.json({ items, total, page: pg, pageSize: lim, totalPages: Math.ceil(total / lim) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// POST mark attendance (faculty or admin)
router.post("/", authenticate, async (req, res) => {
    try {
        // faculty and admin can mark; students cannot
        if (req.user?.role === "student") return res.status(403).json({ error: "Forbidden" });

        const payload = req.body;
        const doc = new Attendance({ ...payload, createdBy: req.user?.id });
        await doc.save();
        res.status(201).json(doc);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT update attendance (admin only typical)
router.put("/:id", authenticate, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Not found" });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
