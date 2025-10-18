import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAttendance extends Document {
    studentId: Types.ObjectId;
    courseId?: Types.ObjectId;
    date: Date;
    status: "present" | "absent" | "late";
    department?: string;
    semester?: number;
    section?: string;
    createdBy?: Types.ObjectId; // user/faculty who marked
    createdAt: Date;
    updatedAt: Date;
}

const AttendanceSchema: Schema = new Schema<IAttendance>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
        courseId: { type: Schema.Types.ObjectId, ref: "Course", index: true },
        date: { type: Date, required: true, index: true },
        status: { type: String, enum: ["present", "absent", "late"], required: true, index: true },
        department: { type: String, index: true },
        semester: { type: Number, index: true },
        section: { type: String, index: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

AttendanceSchema.index({ studentId: 1, date: 1, courseId: 1 }, { unique: false });

export const Attendance = mongoose.model<IAttendance>("Attendance", AttendanceSchema);
