interface ChartPlaceholderProps {
    title?: string;
    height?: number;
}

export function ChartPlaceholder({ title, height = 160 }: ChartPlaceholderProps) {
    return (
        <div className="p-4 border rounded-lg bg-card">
            {title && <div className="font-medium mb-2">{title}</div>}
            <div style={{ height }} className="w-full bg-muted rounded" />
        </div>
    );
}
