interface NoticeCardProps {
    title: string;
    date?: string;
    body?: string;
    tag?: string;
}

export function NoticeCard({ title, date, body, tag }: NoticeCardProps) {
    return (
        <div className="p-4 border rounded-lg bg-card">
            <div className="flex items-start justify-between">
                <div>
                    <div className="font-medium">{title}</div>
                    {date && <div className="text-xs text-muted-foreground">{date}</div>}
                </div>
                {tag && <div className="text-xs px-2 py-1 rounded bg-muted">{tag}</div>}
            </div>
            {body && <div className="text-sm text-muted-foreground mt-2">{body}</div>}
        </div>
    );
}
