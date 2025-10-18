import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AuthShellProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    illustration?: ReactNode;
}

export default function AuthShell({ title, subtitle, children, illustration }: AuthShellProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-extrabold">{title}</h1>
                        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
                    </div>

                    <div className="p-8 rounded-2xl shadow-lg" style={{ backgroundColor: 'hsl(var(--card))' }}>
                        {children}
                        <div className="my-4 text-center text-sm text-muted-foreground">or continue with</div>
                        <div className="flex items-center justify-center gap-3">
                            <Button variant="outline" className="px-3 py-2">Google</Button>
                            <Button variant="outline" className="px-3 py-2">Facebook</Button>
                            <Button variant="outline" className="px-3 py-2">Apple</Button>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {illustration ? (
                            illustration
                        ) : (
                            <div className="rounded-3xl p-12 flex items-center justify-center" style={{ background: 'var(--gradient-soft)' }}>
                                <div className="w-48 h-48 rounded-2xl shadow-md flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--card))' }}>
                                    <div className="text-xl font-medium">Illustration</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
