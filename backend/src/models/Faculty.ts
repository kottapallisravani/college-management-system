import mongoose, { Schema, Document } from "mongoose";

export interface IFaculty extends Document {
    empId: string;
    name: string;
    email: string;
    department?: string;
    designation?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FacultySchema: Schema = new Schema<IFaculty>(
    {
        empId: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true, index: true },
        email: { type: String, required: true, unique: true, lowercase: true, index: true },
        department: { type: String, index: true },
        designation: { type: String },
    },
    { timestamps: true }
);

FacultySchema.index({ name: "text", email: "text", empId: "text" });

export const Faculty = mongoose.model<IFaculty>("Faculty", FacultySchema);
