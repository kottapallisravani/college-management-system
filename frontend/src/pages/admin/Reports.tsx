import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Download, FileText, BarChart3, PieChart, TrendingUp, Users, BookOpen, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminReports() {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [reportType, setReportType] = useState<string>("");
    const [department, setDepartment] = useState<string>("");

    // Mock report categories
    const reportCategories = [
        {
            id: 1,
            title: "Student Analytics",
            description: "Enrollment trends, demographics, and performance statistics",
            icon: Users,
            color: "hsl(var(--primary))",
            reports: ["Enrollment Report", "Demographics Report", "Performance Overview", "Attendance Summary"]
        },
        {
            id: 2,
            title: "Academic Reports",
            description: "Course performance, exam results, and grade distribution",
            icon: BookOpen,
            color: "hsl(var(--success))",
            reports: ["Exam Results", "Grade Distribution", "Course Completion", "Faculty Workload"]
        },
        {
            id: 3,
            title: "Financial Reports",
            description: "Fee collection, payment status, and revenue analysis",
            icon: DollarSign,
            color: "hsl(var(--chart-2))",
            reports: ["Fee Collection", "Payment Status", "Revenue Analysis", "Outstanding Dues"]
        },
        {
            id: 4,
            title: "Custom Reports",
            description: "Build custom reports with specific parameters",
            icon: BarChart3,
            color: "hsl(var(--chart-3))",
            reports: ["Custom Query Builder", "Advanced Analytics", "Data Export", "Scheduled Reports"]
        },
    ];

    // Mock recent reports
    const recentReports = [
        { id: 1, name: "Q4 Enrollment Report", type: "Student Analytics", generatedOn: "2025-10-15", generatedBy: "Admin", size: "2.4 MB" },
        { id: 2, name: "Mid-term Results Analysis", type: "Academic Reports", generatedOn: "2025-10-14", generatedBy: "Admin", size: "1.8 MB" },
        { id: 3, name: "September Fee Collection", type: "Financial Reports", generatedOn: "2025-10-01", generatedBy: "Admin", size: "856 KB" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Generate comprehensive reports and view analytics dashboards.</p>
                </div>
                <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    Create Custom Report
                </Button>
            </div>

            {/* Quick Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Report Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
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

                        <Select value={reportType} onValueChange={setReportType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Report Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="student">Student Analytics</SelectItem>
                                <SelectItem value="academic">Academic Reports</SelectItem>
                                <SelectItem value="financial">Financial Reports</SelectItem>
                            </SelectContent>
                        </Select>

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

                        <Button variant="default">Generate Report</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Report Categories */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Report Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportCategories.map(category => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.id}
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-lg" style={{ background: `${category.color} / 0.1` }}>
                                                <Icon className="h-6 w-6" style={{ color: category.color }} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {category.reports.map((report, idx) => (
                                                        <Button key={idx} variant="outline" size="sm" className="text-xs">
                                                            {report}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Stats */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Quick Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ background: "hsl(var(--primary) / 0.1)" }}>
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">1,245</p>
                                    <p className="text-xs text-muted-foreground">Total Students</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ background: "hsl(var(--success) / 0.1)" }}>
                                    <Users className="h-5 w-5" style={{ color: "hsl(var(--success))" }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">86</p>
                                    <p className="text-xs text-muted-foreground">Faculty Members</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ background: "hsl(var(--chart-2) / 0.1)" }}>
                                    <BookOpen className="h-5 w-5" style={{ color: "hsl(var(--chart-2))" }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">145</p>
                                    <p className="text-xs text-muted-foreground">Active Courses</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ background: "hsl(var(--chart-3) / 0.1)" }}>
                                    <PieChart className="h-5 w-5" style={{ color: "hsl(var(--chart-3))" }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">92%</p>
                                    <p className="text-xs text-muted-foreground">Avg Attendance</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Reports */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Recent Reports</CardTitle>
                        <Button variant="outline" size="sm">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentReports.map(report => (
                            <motion.div
                                key={report.id}
                                whileHover={{ y: -2, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-muted">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{report.name}</h3>
                                                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                                                        <span>{report.type}</span>
                                                        <span>•</span>
                                                        <span>Generated on {report.generatedOn}</span>
                                                        <span>•</span>
                                                        <span>{report.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4 mr-1" />
                                                    Download
                                                </Button>
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
