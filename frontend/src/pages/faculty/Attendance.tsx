import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Save, Download, Upload, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FacultyAttendance() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [course, setCourse] = useState<string>("");
    const [section, setSection] = useState<string>("");

    // Mock student data with attendance state
    const [students, setStudents] = useState([
        { id: 1, rollNo: "CS001", name: "Alice Johnson", present: true },
        { id: 2, rollNo: "CS002", name: "Bob Smith", present: true },
        { id: 3, rollNo: "CS003", name: "Charlie Brown", present: false },
        { id: 4, rollNo: "CS004", name: "Diana Prince", present: true },
        { id: 5, rollNo: "CS005", name: "Ethan Hunt", present: true },
        { id: 6, rollNo: "CS006", name: "Fiona Gallagher", present: true },
        { id: 7, rollNo: "CS007", name: "George Martin", present: false },
        { id: 8, rollNo: "CS008", name: "Hannah Montana", present: true },
    ]);

    const toggleAttendance = (id: number) => {
        setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
    };

    const markAllPresent = () => {
        setStudents(students.map(s => ({ ...s, present: true })));
    };

    const markAllAbsent = () => {
        setStudents(students.map(s => ({ ...s, present: false })));
    };

    const stats = {
        present: students.filter(s => s.present).length,
        absent: students.filter(s => !s.present).length,
        total: students.length,
        percentage: ((students.filter(s => s.present).length / students.length) * 100).toFixed(1),
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Mark Attendance</h1>
                    <p className="text-muted-foreground">Take attendance for your classes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Import
                    </Button>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Attendance
                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold" style={{ color: "hsl(var(--success))" }}>{stats.present}</p>
                            <p className="text-sm text-muted-foreground mt-1">Present</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold" style={{ color: "hsl(var(--destructive))" }}>{stats.absent}</p>
                            <p className="text-sm text-muted-foreground mt-1">Absent</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.total}</p>
                            <p className="text-sm text-muted-foreground mt-1">Total Students</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">{stats.percentage}%</p>
                            <p className="text-sm text-muted-foreground mt-1">Attendance Rate</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Select Class</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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

                        <Select value={course} onValueChange={setCourse}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cs301">Data Structures (CS301)</SelectItem>
                                <SelectItem value="cs302">Database Systems (CS302)</SelectItem>
                                <SelectItem value="cs303">Web Development (CS303)</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={section} onValueChange={setSection}>
                            <SelectTrigger>
                                <SelectValue placeholder="Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A">Section A</SelectItem>
                                <SelectItem value="B">Section B</SelectItem>
                                <SelectItem value="C">Section C</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="default">Load Students</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex gap-3">
                <Button variant="outline" onClick={markAllPresent} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Mark All Present
                </Button>
                <Button variant="outline" onClick={markAllAbsent} className="gap-2">
                    <XCircle className="h-4 w-4" />
                    Mark All Absent
                </Button>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export to CSV
                </Button>
            </div>

            {/* Attendance List */}
            <Card>
                <CardHeader>
                    <CardTitle>Student Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {students.map(student => (
                            <motion.div
                                key={student.id}
                                whileHover={{ y: -2, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                <Checkbox
                                                    checked={student.present}
                                                    onCheckedChange={() => toggleAttendance(student.id)}
                                                    id={`student-${student.id}`}
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <label
                                                            htmlFor={`student-${student.id}`}
                                                            className="font-semibold text-lg cursor-pointer"
                                                        >
                                                            {student.name}
                                                        </label>
                                                        <Badge variant="outline">{student.rollNo}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge
                                                    variant={student.present ? "default" : "secondary"}
                                                    style={student.present
                                                        ? { background: "hsl(var(--success))", borderColor: "hsl(var(--success))" }
                                                        : { background: "hsl(var(--destructive))", borderColor: "hsl(var(--destructive))" }
                                                    }
                                                    className="min-w-[80px] justify-center"
                                                >
                                                    {student.present ? (
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
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Submit */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Review the attendance carefully before submitting. Once submitted, changes will require admin approval.
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button className="gap-2">
                                <Save className="h-4 w-4" />
                                Submit Attendance
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
