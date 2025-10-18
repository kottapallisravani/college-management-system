import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { API_BASE } from "@/lib/api";
import { motion } from "framer-motion";

interface CourseItem {
    _id: string;
    code: string;
    title: string;
    department?: string;
    credits?: number;
    semester?: number;
}

export default function AdminCourses() {
    const [q, setQ] = useState("");
    const [department, setDepartment] = useState<string | undefined>();
    const [semester, setSemester] = useState<string | undefined>();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const queryKey = useMemo(() => ["courses", { q, department, semester, page, limit }], [q, department, semester, page, limit]);

    const { data, isLoading } = useQuery<{ items: CourseItem[]; total: number; page: number; totalPages: number }>({
        queryKey,
        queryFn: async () => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (department) params.set("department", department);
            if (semester) params.set("semester", semester);
            params.set("page", String(page));
            params.set("limit", String(limit));
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/courses?${params.toString()}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
            if (!res.ok) throw new Error("Failed to fetch courses");
            return res.json();
        },
        placeholderData: keepPreviousData,
    });

    const items = data?.items || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Course Management</h1>
                <p className="text-muted-foreground">Manage courses, subjects, and departments.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                        <Input placeholder="Search title or code" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
                        <Select onValueChange={(v) => { setDepartment(v === "all" ? undefined : v); setPage(1); }} value={department || "all"}>
                            <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="CSE">CSE</SelectItem>
                                <SelectItem value="ECE">ECE</SelectItem>
                                <SelectItem value="ME">ME</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(v) => { setSemester(v === "all" ? undefined : v); setPage(1); }} value={semester || "all"}>
                            <SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {isLoading ? (
                        <div className="p-6 text-sm text-muted-foreground">Loading...</div>
                    ) : (
                        <div className="space-y-2">
                            {items.map((c, idx) => (
                                <motion.div key={c._id} className="p-4 border rounded-lg flex items-center justify-between bg-card/50 backdrop-blur-md"
                                    whileHover={{ y: -3, scale: 1.01, backgroundColor: "hsl(var(--primary-light) / 0.1)" }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    custom={idx}
                                >
                                    <div>
                                        <div className="font-medium">{c.title}</div>
                                        <div className="text-sm text-muted-foreground">{c.code} {c.department ? `• ${c.department}` : ""}</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">{c.credits ?? ""} {c.credits ? "credits" : ""}</div>
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
