import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
    title: string;
    body: string;
    tags?: string[];
    published: boolean;
    createdBy: mongoose.Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
}

const AnnouncementSchema: Schema = new Schema<IAnnouncement>(
    {
        title: { type: String, required: true, index: true },
        body: { type: String, required: true },
        tags: { type: [String], default: [] },
        published: { type: Boolean, default: true, index: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

AnnouncementSchema.index({ title: "text", body: "text", tags: 1 });

export const Announcement = mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);
