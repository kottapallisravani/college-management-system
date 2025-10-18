import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, Download, Upload, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminFees() {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [department, setDepartment] = useState<string>("");
    const [semester, setSemester] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Mock fee data
    const feeRecords = [
        { id: 1, rollNo: "CS001", name: "Alice Johnson", department: "CSE", semester: "3", amount: 75000, paid: 75000, due: 0, status: "paid", dueDate: "2025-10-01", paidDate: "2025-09-28" },
        { id: 2, rollNo: "CS002", name: "Bob Smith", department: "CSE", semester: "3", amount: 75000, paid: 50000, due: 25000, status: "partial", dueDate: "2025-10-01", paidDate: "2025-09-15" },
        { id: 3, rollNo: "CS003", name: "Charlie Brown", department: "CSE", semester: "4", amount: 75000, paid: 0, due: 75000, status: "pending", dueDate: "2025-10-01", paidDate: null },
        { id: 4, rollNo: "ECE001", name: "Diana Prince", department: "ECE", semester: "5", amount: 70000, paid: 70000, due: 0, status: "paid", dueDate: "2025-10-01", paidDate: "2025-09-30" },
        { id: 5, rollNo: "ME001", name: "Ethan Hunt", department: "ME", semester: "2", amount: 72000, paid: 36000, due: 36000, status: "partial", dueDate: "2025-10-01", paidDate: "2025-09-20" },
    ];

    const stats = {
        totalCollected: feeRecords.reduce((sum, r) => sum + r.paid, 0),
        totalDue: feeRecords.reduce((sum, r) => sum + r.due, 0),
        paid: feeRecords.filter(r => r.status === "paid").length,
        pending: feeRecords.filter(r => r.status === "pending").length,
        partial: feeRecords.filter(r => r.status === "partial").length,
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Fee Management</h1>
                    <p className="text-muted-foreground">Track fee payments, generate invoices, and manage transactions.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Record Payment
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ background: "hsl(var(--success) / 0.1)" }}>
                                <DollarSign className="h-5 w-5" style={{ color: "hsl(var(--success))" }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₹{(stats.totalCollected / 1000).toFixed(0)}k</p>
                                <p className="text-xs text-muted-foreground">Collected</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ background: "hsl(var(--destructive) / 0.1)" }}>
                                <DollarSign className="h-5 w-5" style={{ color: "hsl(var(--destructive))" }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₹{(stats.totalDue / 1000).toFixed(0)}k</p>
                                <p className="text-xs text-muted-foreground">Due</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: "hsl(var(--success))" }}>{stats.paid}</p>
                            <p className="text-xs text-muted-foreground mt-1">Fully Paid</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{stats.partial}</p>
                            <p className="text-xs text-muted-foreground mt-1">Partial</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>{stats.pending}</p>
                            <p className="text-xs text-muted-foreground mt-1">Pending</p>
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
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                        <Input
                            placeholder="Search by roll no or name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

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

                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="partial">Partial</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
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
                    Export Records
                </Button>
                <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Payments
                </Button>
                <Button variant="outline" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    Generate Invoices
                </Button>
            </div>

            {/* Fee Records */}
            <Card>
                <CardHeader>
                    <CardTitle>Fee Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {feeRecords.map(record => (
                            <motion.div
                                key={record.id}
                                whileHover={{ y: -2, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg">{record.name}</h3>
                                                    <Badge variant="outline">{record.rollNo}</Badge>
                                                    <Badge
                                                        variant={record.status === "paid" ? "default" : record.status === "pending" ? "destructive" : "secondary"}
                                                        style={record.status === "paid" ? { background: "hsl(var(--success))", borderColor: "hsl(var(--success))" } : {}}
                                                    >
                                                        {record.status === "paid" ? <CheckCircle className="h-3 w-3 mr-1" /> : record.status === "pending" ? <XCircle className="h-3 w-3 mr-1" /> : null}
                                                        {record.status}
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm text-muted-foreground">
                                                    <div>
                                                        <span className="font-medium">Department:</span> {record.department}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Semester:</span> {record.semester}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Total:</span> ₹{record.amount.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium" style={{ color: "hsl(var(--success))" }}>Paid:</span> ₹{record.paid.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium" style={{ color: "hsl(var(--destructive))" }}>Due:</span> ₹{record.due.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Due Date:</span> {record.dueDate}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">View Details</Button>
                                                {record.status !== "paid" && (
                                                    <Button variant="default" size="sm">Record Payment</Button>
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
