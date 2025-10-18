import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "@/lib/api";

interface Student {
    _id: string;
    rollNo: string;
    name: string;
    email: string;
    department?: string;
    batchYear?: number;
    semester?: number;
    section?: string;
    status: string;
}

export default function AdminStudents() {
    const [q, setQ] = useState("");
    const [department, setDepartment] = useState<string | undefined>();
    const [status, setStatus] = useState<string | undefined>();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const queryKey = useMemo(() => ["students", { q, department, status, page, limit }], [q, department, status, page, limit]);

    const { data, isLoading } = useQuery<{ items: Student[]; total: number; page: number; totalPages: number }>({
        queryKey,
        queryFn: async () => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (department) params.set("department", department);
            if (status) params.set("status", status);
            params.set("page", String(page));
            params.set("limit", String(limit));
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/students?${params.toString()}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
            if (!res.ok) throw new Error("Failed to fetch students");
            return res.json() as Promise<{ items: Student[]; total: number; page: number; totalPages: number; }>;
        },
        placeholderData: keepPreviousData,
    });

    const items = data?.items || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Student Management</h1>
                <p className="text-muted-foreground">Manage student records, enrollments and profiles.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                        <Input placeholder="Search name, email, roll no" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
                        <Select onValueChange={(v) => { setDepartment(v === "all" ? undefined : v); setPage(1); }} value={department || "all"}>
                            <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="CSE">CSE</SelectItem>
                                <SelectItem value="ECE">ECE</SelectItem>
                                <SelectItem value="ME">ME</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(v) => { setStatus(v === "all" ? undefined : v); setPage(1); }} value={status || "all"}>
                            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                                <SelectItem value="graduated">Graduated</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {isLoading ? (
                        <div className="p-6 text-sm text-muted-foreground">Loading...</div>
                    ) : (
                        <div className="space-y-2">
                            {items.map((s) => (
                                <motion.div key={s._id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 backdrop-blur-md"
                                    whileHover={{ y: -3, scale: 1.01, backgroundColor: "hsl(var(--primary-light) / 0.1)" }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div>
                                        <div className="font-medium">{s.name} <span className="text-xs text-muted-foreground">({s.rollNo})</span></div>
                                        <div className="text-sm text-muted-foreground">{s.email}{s.department ? ` • ${s.department}` : ""}</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground capitalize">{s.status}</div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="mt-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
                                </PaginationItem>
                                {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
                                    const n = i + 1;
                                    return (
                                        <PaginationItem key={n}>
                                            <PaginationLink isActive={n === page} onClick={() => setPage(n)}>{n}</PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                                <PaginationItem>
                                    <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
