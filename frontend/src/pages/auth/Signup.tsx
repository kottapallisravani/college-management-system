import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PillInput from "@/components/PillInput";
import { Mail, Lock } from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import study2Animation from '@/assets/study2.json';
import adminAnimation from '@/assets/admin.json';
import { toast } from "@/hooks/use-toast";
import api from "../../lib/api";
import { useState } from 'react';
import ThemeToggle from "@/components/ThemeToggle";

export default function Signup() {
    const navigate = useNavigate();
    const [role, setRole] = useState<string>("student");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const role = (form.get('role') as string) || 'student';
        const email = (form.get('email') as string) || '';
        const password = (form.get('password') as string) || '';

        try {
            const res = await api.post('/api/auth/signup', { email, password, role });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                toast({ title: 'Signup failed', description: body.error || 'Unable to create account' });
                return;
            }
            toast({ title: 'Account created', description: 'You can now sign in' });
            // navigate to login
            navigate('/login');
        } catch (err) {
            toast({ title: 'Signup error', description: 'Unable to reach server' });
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
                    <h2 className="text-3xl font-bold text-foreground mb-2">Create account</h2>
                    <p className="text-[--muted-foreground] mb-6">Sign up for access to the Campus Management System</p>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <Label className="text-foreground">Full name</Label>
                            <PillInput id="name" name="name" type="text" placeholder="Your full name" required />
                        </div>
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
                            <PillInput id="password" name="password" type="password" placeholder="Choose a password" required leftIcon={<Lock className="h-4 w-4" />} />
                        </div>
                        <div>
                            <Button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-semibold transition-all">Create account</Button>
                        </div>
                    </form>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Already have an account? <button onClick={() => navigate('/login')} className="text-primary underline">Sign in</button>
                    </div>
                </div>

                <div className="flex-1 hidden md:flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--primary-light))' }}>
                    <div className="w-4/5 transform scale-x-[-1] opacity-90">
                        <LottiePlayer animationData={role === 'admin' ? adminAnimation : study2Animation} autoplay loop style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
