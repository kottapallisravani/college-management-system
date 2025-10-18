import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, Download, Upload, FileText } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminExams() {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [department, setDepartment] = useState<string>("");
    const [semester, setSemester] = useState<string>("");
    const [examType, setExamType] = useState<string>("");

    // Mock exam data
    const examSchedule = [
        { id: 1, course: "Data Structures", code: "CS301", date: "2025-11-15", time: "09:00 AM", duration: "3 hours", department: "CSE", semester: "3", type: "Mid-term", status: "scheduled" },
        { id: 2, course: "Database Systems", code: "CS302", date: "2025-11-17", time: "02:00 PM", duration: "3 hours", department: "CSE", semester: "3", type: "Mid-term", status: "scheduled" },
        { id: 3, course: "Operating Systems", code: "CS401", date: "2025-11-20", time: "09:00 AM", duration: "3 hours", department: "CSE", semester: "4", type: "End-term", status: "scheduled" },
        { id: 4, course: "Web Development", code: "CS303", date: "2025-11-10", time: "02:00 PM", duration: "2 hours", department: "CSE", semester: "3", type: "Mid-term", status: "completed" },
    ];

    const stats = {
        scheduled: examSchedule.filter(e => e.status === "scheduled").length,
        completed: examSchedule.filter(e => e.status === "completed").length,
        total: examSchedule.length,
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Exams & Results</h1>
                    <p className="text-muted-foreground">Manage exam schedules, results, and publish grades.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Schedule New Exam
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">{stats.scheduled}</p>
                            <p className="text-sm text-muted-foreground mt-1">Scheduled Exams</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold" style={{ color: "hsl(var(--success))" }}>{stats.completed}</p>
                            <p className="text-sm text-muted-foreground mt-1">Completed Exams</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.total}</p>
                            <p className="text-sm text-muted-foreground mt-1">Total Exams</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-start text-left">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "PP") : "Start date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-start text-left">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PP") : "End date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                            </PopoverContent>
                        </Popover>

                        <Select value={department} onValueChange={setDepartment}>
                            <SelectTrigger>
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="CSE">Computer Science</SelectItem>
                                <SelectItem value="ECE">Electronics</SelectItem>
                                <SelectItem value="ME">Mechanical</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={semester} onValueChange={setSemester}>
                            <SelectTrigger>
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Semesters</SelectItem>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                    <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={examType} onValueChange={setExamType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Exam Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="mid-term">Mid-term</SelectItem>
                                <SelectItem value="end-term">End-term</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="default">Apply Filters</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Schedule
                </Button>
                <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Schedule
                </Button>
                <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Bulk Publish Results
                </Button>
            </div>

            {/* Exam Schedule */}
            <Card>
                <CardHeader>
                    <CardTitle>Exam Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {examSchedule.map((exam, idx) => (
                            <motion.div
                                key={exam.id}
                                whileHover={{ y: -4, scale: 1.015 }}
                                whileTap={{ scale: 0.995 }}
                                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.05 } }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg">{exam.course}</h3>
                                                    <Badge variant="outline">{exam.code}</Badge>
                                                    <Badge
                                                        variant={exam.status === "completed" ? "default" : "secondary"}
                                                        style={exam.status === "completed" ? { background: "hsl(var(--success))", borderColor: "hsl(var(--success))" } : {}}
                                                    >
                                                        {exam.status}
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm text-muted-foreground">
                                                    <div>
                                                        <span className="font-medium">Date:</span> {exam.date}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Time:</span> {exam.time}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Duration:</span> {exam.duration}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Department:</span> {exam.department}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Semester:</span> {exam.semester}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">Edit</Button>
                                                {exam.status === "completed" ? (
                                                    <Button variant="default" size="sm">Publish Results</Button>
                                                ) : (
                                                    <Button variant="destructive" size="sm">Cancel</Button>
                                                )}
                                            </div>
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
