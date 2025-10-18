import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFee extends Document {
    studentId: Types.ObjectId;
    semester: number;
    amount: number; // total
    paid: number; // amount paid
    date?: Date;
    status: "paid" | "partial" | "pending";
    method?: string; // UPI, Net Banking, Card
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FeeSchema: Schema = new Schema<IFee>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
        semester: { type: Number, required: true, index: true },
        amount: { type: Number, required: true },
        paid: { type: Number, required: true, default: 0 },
        date: { type: Date },
        status: { type: String, enum: ["paid", "partial", "pending"], default: "pending", index: true },
        method: { type: String },
        transactionId: { type: String },
    },
    { timestamps: true }
);

FeeSchema.index({ studentId: 1, semester: 1 });

export const Fee = mongoose.model<IFee>("Fee", FeeSchema);
