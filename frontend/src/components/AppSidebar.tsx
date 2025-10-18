import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  BarChart3,
  Bell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  role: "admin" | "faculty" | "student";
}

const menuItems = {
  admin: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Students", url: "/admin/students", icon: Users },
    { title: "Faculty", url: "/admin/faculty", icon: GraduationCap },
    { title: "Courses", url: "/admin/courses", icon: BookOpen },
    { title: "Attendance", url: "/admin/attendance", icon: Calendar },
    { title: "Timetable", url: "/admin/timetable", icon: Calendar },
    { title: "Exams & Results", url: "/admin/exams", icon: FileText },
    { title: "Fee Management", url: "/admin/fees", icon: DollarSign },
    { title: "Reports", url: "/admin/reports", icon: BarChart3 },
    { title: "Announcements", url: "/admin/announcements", icon: Bell },
    { title: "Mess", url: "/admin/mess", icon: BookOpen },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ],
  faculty: [
    { title: "Dashboard", url: "/faculty", icon: LayoutDashboard },
    { title: "My Courses", url: "/faculty/courses", icon: BookOpen },
    { title: "Attendance", url: "/faculty/attendance", icon: Calendar },
    { title: "Timetable", url: "/faculty/timetable", icon: Calendar },
    { title: "Students", url: "/faculty/students", icon: Users },
    { title: "Marks", url: "/faculty/marks", icon: FileText },
    { title: "Assignments", url: "/faculty/assignments", icon: FileText },
    { title: "Announcements", url: "/faculty/announcements", icon: Bell },
    { title: "Mess", url: "/faculty/mess", icon: BookOpen },
    { title: "Profile", url: "/faculty/profile", icon: Settings },
  ],
  student: [
    { title: "Dashboard", url: "/student", icon: LayoutDashboard },
    { title: "My Profile", url: "/student/profile", icon: Users },
    { title: "Attendance", url: "/student/attendance", icon: Calendar },
    { title: "Timetable", url: "/student/timetable", icon: Calendar },
    { title: "Results", url: "/student/results", icon: FileText },
    { title: "Assignments", url: "/student/assignments", icon: FileText },
    { title: "Fee Details", url: "/student/fees", icon: DollarSign },
    { title: "Announcements", url: "/student/announcements", icon: Bell },
    { title: "Mess", url: "/student/mess", icon: BookOpen },
  ],
};

export function AppSidebar({ role }: AppSidebarProps) {
  const { state } = useSidebar();
  const items = menuItems[role];
  const isCollapsed = state === "collapsed";
  const MotionNavLink = motion(NavLink);

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} bg-[hsl(var(--sidebar-background))]/95 backdrop-blur-xl border-r transition-all duration-300`} collapsible="icon">
      <SidebarContent>
        <div className={`p-6 ${isCollapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shadow-card" style={{ backgroundColor: 'hsl(var(--primary-light))' }}>
              <GraduationCap className="h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>Campus</h2>
                <p className="text-xs capitalize" style={{ color: 'hsl(var(--muted-foreground))' }}>{role} portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <MotionNavLink
                      to={item.url}
                      end={item.url.split("/").length === 2}
                      className={({ isActive }) => `group sidebar-item flex items-center gap-3 rounded-xl px-3 py-2 transition-all relative hover:bg-[hsl(var(--sidebar-hover))] ${isActive ? "font-medium bg-[hsl(var(--sidebar-hover))] text-[hsl(var(--foreground))] before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-r-full before:bg-[hsl(var(--primary))]" : "text-[hsl(var(--foreground) / 0.9)]"}`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center shadow-card group-hover:bg-[hsl(var(--primary-light))] group-hover:shadow-elevated transition-all">
                        <item.icon className="h-4 w-4 flex-shrink-0" style={{ color: 'hsl(var(--sidebar-icon))' }} />
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {/* left accent handled via before: pseudo when active */}
                    </MotionNavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
