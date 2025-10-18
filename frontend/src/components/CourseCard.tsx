interface CourseCardProps {
    code: string;
    title: string;
    credits?: number;
    students?: number;
}

export function CourseCard({ code, title, credits, students }: CourseCardProps) {
    return (
        <div className="p-4 border rounded-lg bg-card">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{code} • {credits ?? "--"} credits</div>
            {students !== undefined && <div className="text-sm text-muted-foreground mt-2">{students} students</div>}
        </div>
    );
}
