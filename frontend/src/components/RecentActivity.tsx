interface RecentActivityItem { action: string; subject?: string; time: string }

export function RecentActivity({ items }: { items: RecentActivityItem[] }) {
    return (
        <div className="p-4 border rounded-lg bg-card">
            <div className="font-medium mb-2">Recent Activity</div>
            <div className="space-y-3">
                {items.map((it, i) => (
                    <div key={i} className="text-sm">
                        <div className="font-medium">{it.action}</div>
                        {it.subject && <div className="text-muted-foreground">{it.subject}</div>}
                        <div className="text-xs text-muted-foreground">{it.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
