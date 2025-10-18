interface AssignmentCardProps {
    title: string;
    course?: string;
    due?: string;
    submitted?: number;
    total?: number;
}

export function AssignmentCard({ title, course, due, submitted, total }: AssignmentCardProps) {
    return (
        <div className="p-4 border rounded-lg bg-card">
            <div className="font-medium">{title}</div>
            {course && <div className="text-sm text-muted-foreground">{course}</div>}
            {due && <div className="text-sm text-muted-foreground mt-1">Due: {due}</div>}
            {submitted !== undefined && total !== undefined && (
                <div className="text-sm text-muted-foreground mt-2">{submitted}/{total} submitted</div>
            )}
        </div>
    );
}
