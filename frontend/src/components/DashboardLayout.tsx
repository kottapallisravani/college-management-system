import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "admin" | "faculty" | "student";
  userName?: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col">
          <TopNavbar role={role} userName={userName} />
          <main className="flex-1 p-6 bg-background page-transition">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
