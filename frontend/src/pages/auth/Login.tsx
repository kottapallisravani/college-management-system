import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PillInput from "@/components/PillInput";
import { Mail, Lock } from "lucide-react";
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import api from "../../lib/api";
import LottiePlayer from "@/components/LottiePlayer";
import studyAnimation from '@/assets/study.json';
import adminAnimation from '@/assets/admin.json';
import ThemeToggle from "@/components/ThemeToggle";

export default function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState<string>("student");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const role = (form.get("role") as string) || "student";
        const email = (form.get("email") as string) || "";
        const password = (form.get("password") as string) || "";

        try {
            const res = await api.post('/api/auth/login', { email, password, role });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                toast({ title: 'Login failed', description: body.error || 'Invalid credentials' });
                return;
            }
            const body = await res.json();
            const token = body.token;
            const user = body.user;
            if (token) {
                localStorage.setItem('token', token);
            }
            // route by role returned from server (fallback to selected role)
            const finalRole = user?.role || role;
            if (finalRole === "admin") navigate("/admin");
            else if (finalRole === "faculty") navigate("/faculty");
            else navigate("/student");
        } catch (err) {
            toast({ title: 'Login error', description: 'Unable to reach server' });
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative">
            {/* Theme toggle in top-right corner */}
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="shadow-xl rounded-3xl flex flex-col md:flex-row w-[92%] max-w-5xl overflow-hidden" style={{ backgroundColor: 'hsl(var(--card))' }}>
                <div className="flex-1 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h2>
                    <p className="text-[--muted-foreground] mb-6">Login to your Campus Management account</p>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <Label className="text-foreground">Role</Label>
                            <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-card">
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <Label className="text-foreground">Email</Label>
                            <PillInput id="email" name="email" type="email" placeholder="example@email.com" required leftIcon={<Mail className="h-4 w-4" />} />
                        </div>

                        <div>
                            <Label className="text-foreground">Password</Label>
                            <PillInput id="password" name="password" type="password" placeholder="••••••••" required leftIcon={<Lock className="h-4 w-4" />} showForgot />
                        </div>

                        <div>
                            <Button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-semibold transition-all">Login</Button>
                        </div>
                    </form>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Don't have an account? <button onClick={() => navigate('/signup')} className="text-primary underline">Sign up</button>
                    </div>
                </div>

                <div className="flex-1 hidden md:flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--primary-light))' }}>
                    <div className="w-4/5 transform scale-x-[-1] opacity-90">
                        <LottiePlayer animationData={role === 'admin' ? adminAnimation : studyAnimation} autoplay loop style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
