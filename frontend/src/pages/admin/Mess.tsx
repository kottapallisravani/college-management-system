import React from "react";
import MessTable from "@/components/MessTable";

function parseCSV(content: string) {
    // simple CSV parse: split lines, split by comma, trim
    const lines = content.split(/\r?\n/).filter(Boolean);
    return lines.map((l) => l.split(",").map((c) => c.trim()));
}

export default function AdminMessPage() {
    const [preview, setPreview] = React.useState<string[][]>([]);

    const handleFile = async (file?: File) => {
        if (!file) return;
        const text = await file.text();
        const parsed = parseCSV(text);
        setPreview(parsed);
    };

    return (
        <div className="page-transition p-6">
            <div className="mb-6 flex items-center gap-4">
                <label className="btn-primary inline-flex items-center gap-2 cursor-pointer rounded-md px-3 py-2">
                    <input
                        type="file"
                        accept=".csv,text/csv"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                        className="hidden"
                    />
                    Upload Mess CSV
                </label>
                <div style={{ color: "hsl(var(--muted-foreground))" }} className="text-sm">Accepts comma-separated values. First row used as headers.</div>
            </div>

            {preview.length > 0 && (
                <div className="mb-6 overflow-auto rounded-md border p-4" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                {preview[0].map((h, i) => (
                                    <th key={i} style={{ color: "hsl(var(--foreground))" }} className="px-3 py-2 text-left">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {preview.slice(1).map((row, r) => (
                                <tr key={r} className={r % 2 === 0 ? "" : "bg-[hsl(var(--sidebar-background))]"}>
                                    {row.map((cell, c) => (
                                        <td key={c} style={{ color: "hsl(var(--foreground))" }} className="px-3 py-2">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <MessTable role="admin" />
        </div>
    );
}
