import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/AuthShell";
import LottiePlayer from '@/components/LottiePlayer';
import study2Animation from '@/assets/study2.json';

export default function FacultySignUp() {
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/faculty");
    };

    const form = (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" type="text" required className="rounded-full" />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="rounded-full" />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="rounded-full" />
            </div>
            <div className="flex justify-end">
                <Button type="submit" className="rounded-full py-3">Create account</Button>
            </div>
        </form>
    );

    return (
        <AuthShell title="Create your account" subtitle="Faculty registration" illustration={<LottiePlayer animationData={study2Animation} style={{ width: '100%', height: 'auto', opacity: 0.9 }} />}>
            {form}
        </AuthShell>
    );
}
