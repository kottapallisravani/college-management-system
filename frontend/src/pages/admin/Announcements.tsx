import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { API_BASE } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface AnnouncementItem {
    _id: string;
    title: string;
    body: string;
    published: boolean;
    createdAt: string;
}

export default function AdminAnnouncements() {
    const [q, setQ] = useState("");
    const [published, setPublished] = useState<string | undefined>("true");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const qc = useQueryClient();
    const { toast } = useToast();

    const queryKey = useMemo(() => ["announcements", { q, published, page, limit }], [q, published, page, limit]);

    const { data, isLoading } = useQuery<{ items: AnnouncementItem[]; total: number; page: number; totalPages: number }>({
        queryKey,
        queryFn: async () => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (typeof published !== "undefined" && published !== "") params.set("published", String(published));
            params.set("page", String(page));
            params.set("limit", String(limit));
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/announcements?${params.toString()}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
            if (!res.ok) throw new Error("Failed to fetch announcements");
            return res.json();
        },
        placeholderData: keepPreviousData,
    });

    const mutation = useMutation({
        mutationFn: async (payload: { title: string; body: string; published: boolean }) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/announcements`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed to create announcement");
            return res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["announcements"] });
            toast({ title: "Created", description: "Announcement created" });
            setTitle(""); setBody(""); setPub(true);
        },
        onError: (e: unknown) => {
            const message = e instanceof Error ? e.message : "Failed";
            toast({ title: "Error", description: message, variant: "destructive" });
        }
    });

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [pub, setPub] = useState(true);

    const items = data?.items || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Announcements</h1>
                <p className="text-muted-foreground">Create and manage campus announcements.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Create Announcement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                    <div className="flex items-center gap-2">
                        <Checkbox id="pub" checked={pub} onCheckedChange={(v) => setPub(Boolean(v))} />
                        <label htmlFor="pub" className="text-sm">Published</label>
                    </div>
                    <Button onClick={() => mutation.mutate({ title, body, published: pub })} disabled={!title || !body || mutation.isPending}>Create</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <Input placeholder="Search title or body" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
                        <select className="border rounded px-3 py-2" value={published ?? ""} onChange={(e) => { setPublished(e.target.value); setPage(1); }}>
                            <option value="">All</option>
                            <option value="true">Published</option>
                            <option value="false">Draft</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <div className="p-6 text-sm text-muted-foreground">Loading...</div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((a, idx) => (
                                <motion.div key={a._id}
                                    className="p-4 border rounded-lg bg-card/50 backdrop-blur-md"
                                    whileHover={{ y: -3, scale: 1.01, backgroundColor: "hsl(var(--primary-light) / 0.1)" }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    custom={idx}
                                >
                                    <div className="font-medium">{a.title}</div>
                                    <div className="text-sm text-muted-foreground">{a.body}</div>
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
