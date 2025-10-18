import { Bell, Search, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

interface TopNavbarProps {
  role: "admin" | "faculty" | "student";
  userName?: string;
}

export function TopNavbar({ role, userName = "User" }: TopNavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b backdrop-blur-2xl bg-background/70 shadow-card transition-all duration-300"
        style={{
          borderColor: 'hsl(var(--border))',
          backgroundColor: 'hsl(var(--card))',
          backgroundImage: 'none',
        }}
      >
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="text-foreground" />

          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 rounded-2xl"
                style={{ backgroundColor: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full" style={{ backgroundColor: 'hsl(var(--destructive))' }} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center shadow-card" style={{ backgroundColor: 'hsl(var(--primary))' }}>
                    <User className="h-4 w-4" style={{ color: 'hsl(var(--primary-foreground))' }} />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>{userName}</p>
                    <p className="text-xs capitalize" style={{ color: 'hsl(var(--muted-foreground))' }}>{role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      {/* gradient edge under navbar (hidden in dark mode) */}
      <div className="h-px w-full dark:hidden" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.35), transparent)' }} />
    </>
  );
}
