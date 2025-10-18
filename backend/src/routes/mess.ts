import { Router } from "express";
import multer from "multer";
import { parse } from "csv-parse/sync";
import { MessItem, MessUpload } from "../models/Mess";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
    const items = await MessItem.find().sort({ uploadedAt: -1 });
    res.json(items);
});

router.post("/upload", authenticate, requireRole("admin"), upload.single("file"), async (req, res) => {
    try {
        const buffer = (req.file as Express.Multer.File).buffer;
        const text = buffer.toString("utf-8");
        const records = parse(text, { columns: true, skip_empty_lines: true });
        const columns = Object.keys(records[0] || {});
        const rows = records;
        const uploadDoc = new MessUpload({ columns, rows, uploadedBy: req.user?.email });
        await uploadDoc.save();

        const docs = records.map((r: any) => ({ day: r.Day || r.day || "", meal: r.Meal || r.meal || "", item: r.Item || r.item || "", uploadedBy: req.user?.email }));
        if (docs.length > 0) {
            await MessItem.insertMany(docs);
        }

        res.json({ success: true, insertedRows: rows.length, uploadId: uploadDoc._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
});

export default router;
