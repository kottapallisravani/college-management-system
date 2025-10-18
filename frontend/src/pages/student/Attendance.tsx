import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StudentAttendance() {
    const [selectedCourse, setSelectedCourse] = useState<string>("all");
    const [selectedMonth, setSelectedMonth] = useState<string>("current");

    // Mock attendance data
    const overallStats = {
        totalClasses: 120,
        attended: 110,
        absent: 10,
        percentage: 91.7,
    };

    const courseAttendance = [
        { id: 1, code: "CS301", name: "Data Structures", total: 30, attended: 28, absent: 2, percentage: 93.3 },
        { id: 2, code: "CS302", name: "Database Systems", total: 30, attended: 27, absent: 3, percentage: 90.0 },
        { id: 3, code: "CS303", name: "Web Development", total: 25, attended: 24, absent: 1, percentage: 96.0 },
        { id: 4, code: "MA301", name: "Discrete Mathematics", total: 35, attended: 31, absent: 4, percentage: 88.6 },
    ];

    const recentAttendance = [
        { id: 1, date: "2025-10-17", course: "CS301", subject: "Data Structures", status: "present" },
        { id: 2, date: "2025-10-16", course: "CS302", subject: "Database Systems", status: "present" },
        { id: 3, date: "2025-10-16", course: "CS303", subject: "Web Development", status: "absent" },
        { id: 4, date: "2025-10-15", course: "MA301", subject: "Discrete Mathematics", status: "present" },
        { id: 5, date: "2025-10-15", course: "CS301", subject: "Data Structures", status: "present" },
    ];

    const getStatusColor = (percentage: number) => {
        if (percentage >= 90) return "hsl(var(--success))";
        if (percentage >= 75) return "hsl(var(--chart-2))";
        return "hsl(var(--destructive))";
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Attendance</h1>
                <p className="text-muted-foreground">Track your attendance across all courses.</p>
            </div>

            {/* Overall Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-primary/10">
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{overallStats.totalClasses}</p>
                                <p className="text-sm text-muted-foreground">Total Classes</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg" style={{ background: "hsl(var(--success) / 0.1)" }}>
                                <CheckCircle className="h-6 w-6" style={{ color: "hsl(var(--success))" }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: "hsl(var(--success))" }}>
                                    {overallStats.attended}
                                </p>
                                <p className="text-sm text-muted-foreground">Attended</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg" style={{ background: "hsl(var(--destructive) / 0.1)" }}>
                                <XCircle className="h-6 w-6" style={{ color: "hsl(var(--destructive))" }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>
                                    {overallStats.absent}
                                </p>
                                <p className="text-sm text-muted-foreground">Absent</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg" style={{ background: `${getStatusColor(overallStats.percentage)} / 0.1` }}>
                                <TrendingUp className="h-6 w-6" style={{ color: getStatusColor(overallStats.percentage) }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: getStatusColor(overallStats.percentage) }}>
                                    {overallStats.percentage}%
                                </p>
                                <p className="text-sm text-muted-foreground">Overall</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Warning Alert */}
            {overallStats.percentage < 75 && (
                <Card style={{ borderColor: "hsl(var(--destructive))", background: "hsl(var(--destructive) / 0.05)" }}>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 mt-0.5" style={{ color: "hsl(var(--destructive))" }} />
                            <div>
                                <h3 className="font-semibold" style={{ color: "hsl(var(--destructive))" }}>Low Attendance Warning</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your attendance is below 75%. You need to attend all upcoming classes to meet the minimum requirement.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Course-wise Attendance */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Course-wise Attendance</CardTitle>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                {courseAttendance.map(course => (
                                    <SelectItem key={course.id} value={course.code}>{course.code}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {courseAttendance.map(course => (
                            <motion.div
                                key={course.id}
                                whileHover={{ y: -2, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{course.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{course.code}</p>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    style={{
                                                        background: `${getStatusColor(course.percentage)} / 0.1`,
                                                        borderColor: getStatusColor(course.percentage),
                                                        color: getStatusColor(course.percentage)
                                                    }}
                                                    className="text-lg px-3 py-1"
                                                >
                                                    {course.percentage.toFixed(1)}%
                                                </Badge>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        {course.attended} / {course.total} classes attended
                                                    </span>
                                                    <span className="font-medium">
                                                        {course.absent} absent
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={course.percentage}
                                                    className="h-2"
                                                    style={{
                                                        "--progress-background": getStatusColor(course.percentage)
                                                    } as React.CSSProperties}
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 pt-2">
                                                <div className="text-center p-2 rounded-lg bg-muted">
                                                    <p className="text-sm font-semibold">{course.total}</p>
                                                    <p className="text-xs text-muted-foreground">Total</p>
                                                </div>
                                                <div className="text-center p-2 rounded-lg" style={{ background: "hsl(var(--success) / 0.1)" }}>
                                                    <p className="text-sm font-semibold" style={{ color: "hsl(var(--success))" }}>{course.attended}</p>
                                                    <p className="text-xs text-muted-foreground">Present</p>
                                                </div>
                                                <div className="text-center p-2 rounded-lg" style={{ background: "hsl(var(--destructive) / 0.1)" }}>
                                                    <p className="text-sm font-semibold" style={{ color: "hsl(var(--destructive))" }}>{course.absent}</p>
                                                    <p className="text-xs text-muted-foreground">Absent</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Attendance */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Attendance</CardTitle>
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="current">Current Month</SelectItem>
                                <SelectItem value="last">Last Month</SelectItem>
                                <SelectItem value="all">All Time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentAttendance.map(record => (
                            <motion.div
                                key={record.id}
                                whileHover={{ y: -2, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="text-center">
                                                    <p className="text-sm font-semibold">{new Date(record.date).getDate()}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{record.subject}</h3>
                                                    <p className="text-sm text-muted-foreground">{record.course}</p>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={record.status === "present" ? "default" : "secondary"}
                                                style={record.status === "present"
                                                    ? { background: "hsl(var(--success))", borderColor: "hsl(var(--success))" }
                                                    : { background: "hsl(var(--destructive))", borderColor: "hsl(var(--destructive))" }
                                                }
                                            >
                                                {record.status === "present" ? (
                                                    <>
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Present
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Absent
                                                    </>
                                                )}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
