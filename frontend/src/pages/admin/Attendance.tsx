import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Download, Upload } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminAttendance() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [department, setDepartment] = useState<string>("");
    const [semester, setSemester] = useState<string>("");
    const [section, setSection] = useState<string>("");

    // Mock attendance data
    const attendanceRecords = [
        { id: 1, rollNo: "CS001", name: "Alice Johnson", status: "present", subject: "Mathematics" },
        { id: 2, rollNo: "CS002", name: "Bob Smith", status: "absent", subject: "Mathematics" },
        { id: 3, rollNo: "CS003", name: "Charlie Brown", status: "present", subject: "Mathematics" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Attendance Management</h1>
                <p className="text-muted-foreground">View and manage attendance records across all departments.</p>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-start text-left">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>

                        <Select value={department} onValueChange={setDepartment}>
                            <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="CSE">CSE</SelectItem>
                                <SelectItem value="ECE">ECE</SelectItem>
                                <SelectItem value="ME">ME</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={semester} onValueChange={setSemester}>
                            <SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                                    <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={section} onValueChange={setSection}>
                            <SelectTrigger><SelectValue placeholder="Section" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A">Section A</SelectItem>
                                <SelectItem value="B">Section B</SelectItem>
                                <SelectItem value="C">Section C</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="default">Apply Filters</Button>
                    </div>

                    <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Attendance Records */}
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Records - {date ? format(date, "MMMM dd, yyyy") : "Today"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {attendanceRecords.map((record, idx) => (
                            <motion.div
                                key={record.id}
                                className="flex items-center justify-between p-4 border rounded-lg bg-card/50 backdrop-blur-md"
                                whileHover={{ y: -3, scale: 1.01, backgroundColor: "hsl(var(--primary-light) / 0.1)" }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.05 } }}
                            >
                                <div className="flex-1">
                                    <div className="font-medium">{record.name}</div>
                                    <div className="text-sm text-muted-foreground">{record.rollNo} • {record.subject}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${record.status === 'present'
                                        ? 'bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]'
                                        : 'bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))]'
                                        }`}>
                                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {attendanceRecords.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No attendance records found. Select filters and date to view records.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Present</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[hsl(var(--success))]">2</div>
                        <p className="text-xs text-muted-foreground">66.7% attendance</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Absent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[hsl(var(--destructive))]">1</div>
                        <p className="text-xs text-muted-foreground">33.3% absent</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Enrolled students</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
