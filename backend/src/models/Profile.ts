import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProfile extends Document {
    userId: Types.ObjectId; // references User
    role: "admin" | "faculty" | "student";
    name?: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
    department?: string;
    semester?: number; // for students
    designation?: string; // for faculty
    guardianName?: string; // student
    guardianPhone?: string; // student
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema: Schema = new Schema<IProfile>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
        role: { type: String, enum: ["admin", "faculty", "student"], required: true },
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        avatarUrl: { type: String },
        department: { type: String },
        semester: { type: Number },
        designation: { type: String },
        guardianName: { type: String },
        guardianPhone: { type: String },
    },
    { timestamps: true }
);

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
