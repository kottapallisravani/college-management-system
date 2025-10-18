import express from 'express';
import Timetable from '../models/Timetable';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import { parse } from 'csv-parse/sync';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get active timetable
router.get('/active', authenticate, async (req, res) => {
    try {
        const timetable = await Timetable.findOne({ isActive: true })
            .sort({ uploadedAt: -1 })
            .populate('uploadedBy', 'name email');

        if (!timetable) {
            return res.status(404).json({ message: 'No active timetable found' });
        }

        res.json(timetable);
    } catch (error) {
        console.error('Error fetching timetable:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all timetables (admin only)
router.get('/all', authenticate, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const timetables = await Timetable.find()
            .sort({ uploadedAt: -1 })
            .populate('uploadedBy', 'name email');

        res.json(timetables);
    } catch (error) {
        console.error('Error fetching timetables:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload new timetable from CSV (admin only)
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Parse CSV
        const csvContent = req.file.buffer.toString('utf-8');
        const records = parse(csvContent, {
            skip_empty_lines: true,
            trim: true,
            relax_column_count: true, // Allow variable column counts
            relax_quotes: true,
        }) as string[][];

        if (records.length < 2) {
            return res.status(400).json({ message: 'Invalid CSV format' });
        }

        // First row should be header: Time, Monday, Tuesday, etc.
        const header = records[0];
        const days = header.slice(1); // Skip "Time" column

        // Build schedule object
        const schedule: Record<string, Record<string, string>> = {};

        let metadataStartIndex = records.length;

        // Find where metadata starts - look for rows that don't match time format
        for (let i = 1; i < records.length; i++) {
            const row = records[i];
            const firstCell = row[0]?.trim().toLowerCase() || '';

            // Check if this looks like a metadata row or empty row
            if (
                !firstCell ||
                firstCell.includes('academic') ||
                firstCell.includes('semester') ||
                firstCell.includes('class') ||
                firstCell.includes('section') ||
                row.length < days.length // Row doesn't have enough columns for schedule
            ) {
                metadataStartIndex = i;
                break;
            }

            const time = row[0];
            if (time && time.trim()) {
                days.forEach((day, index) => {
                    if (!schedule[day]) {
                        schedule[day] = {};
                    }
                    const subject = row[index + 1] || '';
                    if (subject && subject.trim()) {
                        schedule[day][time] = subject.trim();
                    }
                });
            }
        }

        // Extract metadata from bottom rows
        let academicYear = '2024-2025';
        let semester = 'Fall';
        let className = '';
        let section = '';

        for (let i = metadataStartIndex; i < records.length; i++) {
            const row = records[i];
            if (row.length >= 2 && row[0] && row[1]) {
                const key = row[0].trim().toLowerCase();
                const value = row[1].trim();

                if (key.includes('academic') || key.includes('year')) {
                    academicYear = value;
                } else if (key.includes('semester')) {
                    semester = value;
                } else if (key.includes('class') && !key.includes('section')) {
                    className = value;
                } else if (key.includes('section')) {
                    section = value;
                }
            }
        }

        if (Object.keys(schedule).length === 0) {
            return res.status(400).json({ message: 'No schedule data found in CSV' });
        }

        // Deactivate all previous timetables
        await Timetable.updateMany({}, { isActive: false });

        // Create new timetable
        const newTimetable = new Timetable({
            schedule,
            uploadedBy: req.user.id,
            academicYear,
            semester,
            className,
            section,
            isActive: true,
        });

        await newTimetable.save();

        const populatedTimetable = await Timetable.findById(newTimetable._id)
            .populate('uploadedBy', 'name email');

        res.status(201).json({
            message: 'Timetable uploaded successfully',
            timetable: populatedTimetable,
        });
    } catch (error) {
        console.error('Error uploading timetable:', error);
        res.status(500).json({ message: 'Server error: ' + (error as Error).message });
    }
});

// Update timetable (admin only)
router.put('/:id', authenticate, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const { id } = req.params;
        const { schedule, academicYear, semester, className, section, isActive } = req.body;

        const timetable = await Timetable.findById(id);

        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        // If setting this as active, deactivate others
        if (isActive) {
            await Timetable.updateMany({ _id: { $ne: id } }, { isActive: false });
        }

        timetable.schedule = schedule || timetable.schedule;
        timetable.academicYear = academicYear || timetable.academicYear;
        timetable.semester = semester || timetable.semester;
        timetable.className = className || timetable.className;
        timetable.section = section || timetable.section;
        timetable.isActive = isActive !== undefined ? isActive : timetable.isActive;

        await timetable.save();

        const updatedTimetable = await Timetable.findById(id)
            .populate('uploadedBy', 'name email');

        res.json({
            message: 'Timetable updated successfully',
            timetable: updatedTimetable,
        });
    } catch (error) {
        console.error('Error updating timetable:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete timetable (admin only)
router.delete('/:id', authenticate, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const { id } = req.params;
        const timetable = await Timetable.findByIdAndDelete(id);

        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        res.json({ message: 'Timetable deleted successfully' });
    } catch (error) {
        console.error('Error deleting timetable:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get sample timetable CSV
router.get('/sample', authenticate, async (req, res) => {
    try {
        // Generate CSV with time slots as rows and days as columns
        const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const sampleData: Record<string, Record<string, string>> = {
            Monday: {
                '08:00 AM': 'Math',
                '09:00 AM': 'English',
                '10:00 AM': 'History',
                '11:00 AM': 'Biology',
                '12:00 PM': 'Physical Education',
                '01:00 PM': 'Lunch',
                '02:00 PM': 'Games',
                '03:00 PM': 'Break',
            },
            Tuesday: {
                '08:00 AM': 'Chemistry',
                '09:00 AM': 'Math',
                '10:00 AM': 'Geography',
                '11:00 AM': 'History',
                '12:00 PM': 'Art',
                '01:00 PM': 'Lunch',
                '02:00 PM': 'Break',
                '03:00 PM': 'Music',
            },
            Wednesday: {
                '08:00 AM': 'Math',
                '09:00 AM': 'English',
                '10:00 AM': 'History',
                '11:00 AM': 'Biology',
                '12:00 PM': 'Physical Education',
                '01:00 PM': 'Lunch',
                '02:00 PM': 'Games',
                '03:00 PM': 'Break',
            },
            Thursday: {
                '08:00 AM': 'Chemistry',
                '09:00 AM': 'Math',
                '10:00 AM': 'Geography',
                '11:00 AM': 'History',
                '12:00 PM': 'Art',
                '01:00 PM': 'Lunch',
                '02:00 PM': 'Break',
                '03:00 PM': 'Music',
            },
            Friday: {
                '08:00 AM': 'Math',
                '09:00 AM': 'English',
                '10:00 AM': 'History',
                '11:00 AM': 'Biology',
                '12:00 PM': 'Physical Education',
                '01:00 PM': 'Lunch',
                '02:00 PM': 'Games',
                '03:00 PM': 'Break',
            },
            Saturday: {
                '09:00 AM': 'Games',
                '10:00 AM': 'Math',
                '11:00 AM': 'Geography',
                '12:00 PM': 'History',
                '01:00 PM': 'Lunch',
                '02:00 PM': 'Break',
                '03:00 PM': 'Art',
            },
        };

        // Build CSV content
        let csvContent = 'Time,' + days.join(',') + '\n';

        times.forEach(time => {
            const row = [time];
            days.forEach(day => {
                row.push(sampleData[day]?.[time] || '');
            });
            csvContent += row.join(',') + '\n';
        });

        // Add metadata rows at the bottom
        csvContent += '\n';
        csvContent += 'Academic Year,2024-2025\n';
        csvContent += 'Semester,Fall\n';
        csvContent += 'Class,Class 10\n';
        csvContent += 'Section,A\n';

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=timetable-sample.csv');
        res.send(csvContent);
    } catch (error) {
        console.error('Error generating sample:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
