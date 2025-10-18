import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMark extends Document {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    examType: string; // Mid-term, End-term, Quiz, Assignment
    semester?: number;
    marks?: number;
    maxMarks?: number;
    status?: "submitted" | "pending";
    createdBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const MarkSchema: Schema = new Schema<IMark>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
        courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true, index: true },
        examType: { type: String, required: true, index: true },
        semester: { type: Number, index: true },
        marks: { type: Number },
        maxMarks: { type: Number, default: 100 },
        status: { type: String, enum: ["submitted", "pending"], default: "pending", index: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

MarkSchema.index({ studentId: 1, courseId: 1, examType: 1 }, { unique: false });

export const Mark = mongoose.model<IMark>("Mark", MarkSchema);
