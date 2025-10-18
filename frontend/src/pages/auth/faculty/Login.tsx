import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/AuthShell";
import PillInput from "@/components/PillInput";
import { Mail, Lock } from "lucide-react";

export default function FacultyLogin() {
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/faculty");
    };

    const form = (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <PillInput id="email" type="email" placeholder="email@university.edu" required leftIcon={<Mail className="h-4 w-4" />} />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <PillInput id="password" type="password" placeholder="Enter your password" required leftIcon={<Lock className="h-4 w-4" />} showForgot />
            </div>
            <div className="mt-2">
                <Button type="submit" className="w-full rounded-full py-3 bg-amber-200 text-amber-900 hover:opacity-90">Login</Button>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2">
                Don't have an account? <button type="button" className="text-primary underline" onClick={() => navigate('/signup/faculty')}>Sign up</button>
            </div>
        </form>
    );

    return (
        <AuthShell title="Welcome Back!!" subtitle="Faculty sign in" illustration={null}>
            {form}
        </AuthShell>
    );
}
