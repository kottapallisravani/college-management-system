import mongoose, { Schema, Document } from 'mongoose';

export interface ITimetableSlot {
    time: string;
    subject: string;
}

export interface ITimetableDay {
    [time: string]: string;
}

export interface ITimetableSchedule {
    Monday?: ITimetableDay;
    Tuesday?: ITimetableDay;
    Wednesday?: ITimetableDay;
    Thursday?: ITimetableDay;
    Friday?: ITimetableDay;
    Saturday?: ITimetableDay;
    Sunday?: ITimetableDay;
}

export interface ITimetable extends Document {
    schedule: ITimetableSchedule;
    uploadedBy: mongoose.Types.ObjectId;
    uploadedAt: Date;
    academicYear: string;
    semester: string;
    className?: string;
    section?: string;
    isActive: boolean;
}

const TimetableSchema: Schema = new Schema({
    schedule: {
        type: Map,
        of: Map,
        required: true,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    academicYear: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    className: {
        type: String,
    },
    section: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model<ITimetable>('Timetable', TimetableSchema);
