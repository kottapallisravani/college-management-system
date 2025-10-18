import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    role: "admin" | "faculty" | "student";
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "faculty", "student"], required: true },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
