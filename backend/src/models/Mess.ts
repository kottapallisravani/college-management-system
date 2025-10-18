import mongoose, { Schema, Document } from "mongoose";

export interface IMessItem extends Document {
    day: string;
    meal: string;
    item: string;
    uploadedBy?: string;
    uploadedAt?: Date;
}

const MessSchema: Schema = new Schema<IMessItem>(
    {
        day: { type: String, required: true },
        meal: { type: String, required: true },
        item: { type: String, required: true },
        uploadedBy: { type: String },
    },
    { timestamps: { createdAt: "uploadedAt" } }
);

export const MessItem = mongoose.model<IMessItem>("MessItem", MessSchema);

// Dynamic upload model: store columns and rows
export interface IMessUpload extends Document {
    columns: string[];
    rows: any[];
    uploadedBy?: string;
    uploadedAt?: Date;
}

const MessUploadSchema: Schema = new Schema<IMessUpload>(
    {
        columns: { type: [String], required: true },
        rows: { type: [Schema.Types.Mixed as any], required: true },
        uploadedBy: { type: String },
    },
    { timestamps: { createdAt: "uploadedAt" } }
);

export const MessUpload = mongoose.model<IMessUpload>("MessUpload", MessUploadSchema);
