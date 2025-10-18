import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExam extends Document {
    courseId: Types.ObjectId;
    code?: string;
    title?: string;
    department?: string;
    semester?: number;
    type?: string; // Mid-term, End-term, Quiz
    date: Date;
    time?: string;
    duration?: string;
    status?: "scheduled" | "completed" | "canceled";
    createdAt: Date;
    updatedAt: Date;
}

const ExamSchema: Schema = new Schema<IExam>(
    {
        courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true, index: true },
        code: { type: String },
        title: { type: String },
        department: { type: String, index: true },
        semester: { type: Number, index: true },
        type: { type: String, index: true },
        date: { type: Date, required: true, index: true },
        time: { type: String },
        duration: { type: String },
        status: { type: String, enum: ["scheduled", "completed", "canceled"], default: "scheduled", index: true },
    },
    { timestamps: true }
);

export const Exam = mongoose.model<IExam>("Exam", ExamSchema);
