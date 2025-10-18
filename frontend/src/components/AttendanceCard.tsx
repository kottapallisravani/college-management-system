interface AttendanceCardProps {
    subject: string;
    attended: number;
    total: number;
}

export function AttendanceCard({ subject, attended, total }: AttendanceCardProps) {
    const pct = Math.round((attended / total) * 100);
    const color = pct >= 85 ? "bg-green-500" : pct >= 70 ? "bg-yellow-500" : "bg-red-500";

    return (
        <div className="p-4 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
                <div>
                    <div className="font-medium">{subject}</div>
                    <div className="text-sm text-muted-foreground">{attended} / {total} classes</div>
                </div>
                <div className="text-xl font-bold">{pct}%</div>
            </div>
            <div className="h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div className={`${color} h-full`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
