import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
    rollNo: string;
    name: string;
    email: string;
    department?: string;
    batchYear?: number;
    semester?: number;
    section?: string;
    status: "active" | "suspended" | "graduated";
    createdAt: Date;
    updatedAt: Date;
}

const StudentSchema: Schema = new Schema<IStudent>(
    {
        rollNo: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true, index: true },
        email: { type: String, required: true, unique: true, lowercase: true, index: true },
        department: { type: String, index: true },
        batchYear: { type: Number, index: true },
        semester: { type: Number, index: true },
        section: { type: String, index: true },
        status: { type: String, enum: ["active", "suspended", "graduated"], default: "active", index: true },
    },
    { timestamps: true }
);

StudentSchema.index({ name: "text", email: "text", rollNo: "text" });

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
