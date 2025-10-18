import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
    code: string;
    title: string;
    department?: string;
    credits?: number;
    semester?: number;
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema: Schema = new Schema<ICourse>(
    {
        code: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true, index: true },
        department: { type: String, index: true },
        credits: { type: Number },
        semester: { type: Number, index: true },
    },
    { timestamps: true }
);

CourseSchema.index({ title: "text", code: "text" });

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
