import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Download, CheckCircle, Clock, AlertCircle, CreditCard } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StudentFees() {
    const [semester, setSemester] = useState<string>("current");

    // Mock fee data
    const feeStructure = {
        tuitionFee: 60000,
        libraryFee: 5000,
        labFee: 8000,
        examFee: 2000,
        total: 75000,
    };

    const paymentHistory = [
        { id: 1, semester: "3", amount: 75000, paid: 75000, date: "2025-09-28", status: "paid", method: "UPI", transactionId: "TXN123456789" },
        { id: 2, semester: "2", amount: 75000, paid: 75000, date: "2025-02-15", status: "paid", method: "Net Banking", transactionId: "TXN987654321" },
        { id: 3, semester: "1", amount: 75000, paid: 50000, date: "2024-08-20", status: "partial", method: "Credit Card", transactionId: "TXN456789123" },
    ];

    const currentDues = {
        total: 75000,
        paid: 75000,
        due: 0,
        dueDate: "2025-10-01",
        lateFee: 0,
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Fee Details</h1>
                    <p className="text-muted-foreground">View fee structure, payment history, and make payments.</p>
                </div>
                <Button className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Make Payment
                </Button>
            </div>

            {/* Current Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Current Semester Fee Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-primary/10">
                                <DollarSign className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₹{currentDues.total.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">Total Fees</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg" style={{ background: "hsl(var(--success) / 0.1)" }}>
                                <CheckCircle className="h-6 w-6" style={{ color: "hsl(var(--success))" }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: "hsl(var(--success))" }}>
                                    ₹{currentDues.paid.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">Paid</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg" style={{ background: currentDues.due > 0 ? "hsl(var(--destructive) / 0.1)" : "hsl(var(--success) / 0.1)" }}>
                                {currentDues.due > 0 ? (
                                    <AlertCircle className="h-6 w-6" style={{ color: "hsl(var(--destructive))" }} />
                                ) : (
                                    <CheckCircle className="h-6 w-6" style={{ color: "hsl(var(--success))" }} />
                                )}
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: currentDues.due > 0 ? "hsl(var(--destructive))" : "hsl(var(--success))" }}>
                                    ₹{currentDues.due.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">Outstanding</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-muted">
                                <Clock className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{currentDues.dueDate}</p>
                                <p className="text-sm text-muted-foreground">Due Date</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Fee Structure */}
            <Card>
                <CardHeader>
                    <CardTitle>Fee Structure (Semester 3)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { label: "Tuition Fee", amount: feeStructure.tuitionFee },
                            { label: "Library Fee", amount: feeStructure.libraryFee },
                            { label: "Laboratory Fee", amount: feeStructure.labFee },
                            { label: "Examination Fee", amount: feeStructure.examFee },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                                <span className="font-medium">{item.label}</span>
                                <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between p-4 border-2 border-primary rounded-lg bg-primary/5">
                            <span className="font-bold text-lg">Total Amount</span>
                            <span className="font-bold text-xl text-primary">₹{feeStructure.total.toLocaleString()}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Payment History</CardTitle>
                        <div className="flex gap-2">
                            <Select value={semester} onValueChange={setSemester}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="current">Current Semester</SelectItem>
                                    <SelectItem value="all">All Semesters</SelectItem>
                                    {[1, 2, 3, 4, 5, 6].map(sem => (
                                        <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Receipt
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {paymentHistory.map(payment => (
                            <motion.div
                                key={payment.id}
                                whileHover={{ y: -2, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg">Semester {payment.semester}</h3>
                                                    <Badge
                                                        variant={payment.status === "paid" ? "default" : "secondary"}
                                                        style={payment.status === "paid" ? { background: "hsl(var(--success))", borderColor: "hsl(var(--success))" } : {}}
                                                    >
                                                        {payment.status === "paid" && <CheckCircle className="h-3 w-3 mr-1" />}
                                                        {payment.status}
                                                    </Badge>
                                                    <Badge variant="outline">{payment.method}</Badge>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground">
                                                    <div>
                                                        <span className="font-medium">Total:</span> ₹{payment.amount.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium" style={{ color: "hsl(var(--success))" }}>Paid:</span> ₹{payment.paid.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Date:</span> {payment.date}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Transaction ID:</span> {payment.transactionId}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">View Receipt</Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4" />
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

            {/* Payment Instructions */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>• Payments can be made through UPI, Net Banking, Credit/Debit Card, or at the campus accounts office.</p>
                        <p>• Keep your transaction ID safe for future reference.</p>
                        <p>• Late fee of ₹500 will be charged after the due date.</p>
                        <p>• For payment-related queries, contact the accounts department at accounts@campusorbit.edu</p>
                        <p>• Download your receipt after successful payment for your records.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
