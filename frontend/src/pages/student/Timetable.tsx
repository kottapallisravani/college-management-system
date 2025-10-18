import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, BookOpen, FlaskConical, Globe, Palette, GraduationCap, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { API_BASE } from '@/lib/api';
import { motion } from 'framer-motion';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

const subjectIcons: Record<string, React.ReactNode> = {
    'Math': <Calculator className="h-5 w-5 text-blue-600" />,
    'English': <BookOpen className="h-5 w-5 text-green-600" />,
    'History': <GraduationCap className="h-5 w-5 text-purple-600" />,
    'Biology': <FlaskConical className="h-5 w-5 text-pink-600" />,
    'Physical Education': <Activity className="h-5 w-5 text-red-600" />,
    'Chemistry': <FlaskConical className="h-5 w-5 text-yellow-600" />,
    'Geography': <Globe className="h-5 w-5 text-teal-600" />,
    'Art': <Palette className="h-5 w-5 text-orange-600" />,
    'Games': <Activity className="h-5 w-5 text-green-600" />,
    'Music': <Activity className="h-5 w-5 text-indigo-600" />,
    'Lunch': <Palette className="h-5 w-5 text-gray-600" />,
    'Break': <Palette className="h-5 w-5 text-gray-400" />,
};

interface TimetableSchedule {
    [day: string]: {
        [time: string]: string;
    };
}

interface TimetableData {
    _id?: string;
    schedule: TimetableSchedule;
    academicYear: string;
    semester: string;
    className?: string;
    section?: string;
    uploadedAt?: string;
}

export default function StudentTimetable() {
    const [timetable, setTimetable] = useState<TimetableData | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchTimetable = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE}/api/timetable/active`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTimetable(data);
            } else if (response.status === 404) {
                setTimetable(null);
            }
        } catch (error) {
            console.error('Error fetching timetable:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch timetable',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchTimetable();
    }, [fetchTimetable]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg">Loading timetable...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-6 bg-background">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-4">My Timetable</h2>

                {timetable && (
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Timetable Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-semibold">Academic Year:</span> {timetable.academicYear}
                                </div>
                                <div>
                                    <span className="font-semibold">Semester:</span> {timetable.semester}
                                </div>
                                {timetable.className && (
                                    <div>
                                        <span className="font-semibold">Class:</span> {timetable.className}
                                    </div>
                                )}
                                {timetable.section && (
                                    <div>
                                        <span className="font-semibold">Section:</span> {timetable.section}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {timetable ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-card border border-border rounded-lg shadow-md">
                        <thead className="bg-primary text-primary-foreground">
                            <tr>
                                <th className="px-6 py-3 border-b text-lg">Time</th>
                                {daysOfWeek.map(day => (
                                    <th key={day} className="px-6 py-3 border-b text-lg">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {times.map(time => (
                                <tr key={time} className="border-t border-border">
                                    <td className="px-6 py-3 font-bold border-r bg-muted text-muted-foreground">{time}</td>
                                    {daysOfWeek.map(day => {
                                        const schedule = timetable.schedule[day] || {};
                                        const subject = schedule[time];
                                        return (
                                            <td key={day} className="px-6 py-3 border-r text-center">
                                                <motion.div
                                                    whileHover={{ y: -2, scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                    className={`flex items-center justify-center space-x-2 p-2 rounded-md ${subject
                                                        ? 'bg-primary/10 text-primary shadow-sm'
                                                        : 'bg-muted/50 text-muted-foreground'
                                                        }`}
                                                >
                                                    {subject ? (
                                                        <>
                                                            {subjectIcons[subject] || <BookOpen className="h-5 w-5" />}
                                                            <span className="font-semibold">{subject}</span>
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </motion.div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <GraduationCap className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Timetable Available</h3>
                        <p className="text-muted-foreground">The timetable will be available once uploaded by admin</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
