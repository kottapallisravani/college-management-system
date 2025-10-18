interface ProfileCardProps {
    name: string;
    id?: string;
    dept?: string;
    role?: string;
}

export function ProfileCard({ name, id, dept, role }: ProfileCardProps) {
    return (
        <div className="p-4 border rounded-lg flex items-center gap-4 bg-card">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center font-medium text-muted-foreground">{name.split(" ").map(n => n[0]).join("")}</div>
            <div>
                <div className="font-medium">{name}</div>
                {id && <div className="text-sm text-muted-foreground">{id}</div>}
                {dept && <div className="text-sm text-muted-foreground">{dept}</div>}
                {role && <div className="text-xs text-muted-foreground">{role}</div>}
            </div>
        </div>
    );
}
