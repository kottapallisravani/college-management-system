import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Upload, Download, Save, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FacultyMarks() {
    const [course, setCourse] = useState<string>("");
    const [examType, setExamType] = useState<string>("");
    const [semester, setSemester] = useState<string>("");

    // Mock student marks data
    const students = [
        { id: 1, rollNo: "CS001", name: "Alice Johnson", marks: 85, maxMarks: 100, status: "submitted" },
        { id: 2, rollNo: "CS002", name: "Bob Smith", marks: 78, maxMarks: 100, status: "submitted" },
        { id: 3, rollNo: "CS003", name: "Charlie Brown", marks: 92, maxMarks: 100, status: "submitted" },
        { id: 4, rollNo: "CS004", name: "Diana Prince", marks: null, maxMarks: 100, status: "pending" },
        { id: 5, rollNo: "CS005", name: "Ethan Hunt", marks: 88, maxMarks: 100, status: "submitted" },
    ];

    const stats = {
        submitted: students.filter(s => s.status === "submitted").length,
        pending: students.filter(s => s.status === "pending").length,
        average: students.filter(s => s.marks !== null).reduce((sum, s) => sum + (s.marks || 0), 0) / students.filter(s => s.marks !== null).length,
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Marks & Evaluations</h1>
                    <p className="text-muted-foreground">Upload, manage, and publish student marks.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Import CSV
                    </Button>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save & Publish
                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold" style={{ color: "hsl(var(--success))" }}>{stats.submitted}</p>
                            <p className="text-sm text-muted-foreground mt-1">Marks Submitted</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">{stats.pending}</p>
                            <p className="text-sm text-muted-foreground mt-1">Pending Entries</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.average.toFixed(1)}</p>
                            <p className="text-sm text-muted-foreground mt-1">Class Average</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Select Course & Exam</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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

                        <Select value={semester} onValueChange={setSemester}>
                            <SelectTrigger>
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent>
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
                                <SelectItem value="mid-term">Mid-term Exam</SelectItem>
                                <SelectItem value="end-term">End-term Exam</SelectItem>
                                <SelectItem value="assignment">Assignment</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="default">Load Students</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Marks Entry */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Enter Marks</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Generate Report
                            </Button>
                        </div>
                    </div>
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
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                                <div>
                                                    <div className="font-semibold">{student.name}</div>
                                                    <div className="text-sm text-muted-foreground">{student.rollNo}</div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor={`marks-${student.id}`} className="text-sm whitespace-nowrap">
                                                        Marks Obtained:
                                                    </Label>
                                                    <Input
                                                        id={`marks-${student.id}`}
                                                        type="number"
                                                        placeholder="0"
                                                        defaultValue={student.marks || ""}
                                                        className="w-20"
                                                        min="0"
                                                        max={student.maxMarks}
                                                    />
                                                </div>

                                                <div className="text-sm text-muted-foreground">
                                                    Out of: <span className="font-semibold">{student.maxMarks}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={student.status === "submitted" ? "default" : "secondary"}
                                                        style={student.status === "submitted" ? { background: "hsl(var(--success))", borderColor: "hsl(var(--success))" } : {}}
                                                    >
                                                        {student.status === "submitted" && <CheckCircle className="h-3 w-3 mr-1" />}
                                                        {student.status}
                                                    </Badge>
                                                    {student.marks !== null && (
                                                        <span className="text-sm font-semibold">
                                                            {((student.marks / student.maxMarks) * 100).toFixed(1)}%
                                                        </span>
                                                    )}
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

            {/* Actions */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Make sure all marks are entered correctly before publishing. Students will be notified once published.
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline">Save as Draft</Button>
                            <Button className="gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Publish Marks
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
