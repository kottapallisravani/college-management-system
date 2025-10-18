import { Users, GraduationCap, BookOpen, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsTile } from "@/components/StatsTile";
import { ChartPlaceholder } from "@/components/ChartPlaceholder";
import { RecentActivity } from "@/components/RecentActivity";
import { NoticeCard } from "@/components/NoticeCard";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Students", value: 2847, description: "Active students", icon: Users, trend: { value: 12, isPositive: true } },
    { title: "Faculty Members", value: 156, description: "Active faculty", icon: GraduationCap, trend: { value: 5, isPositive: true } },
    { title: "Active Courses", value: 48, description: "This semester", icon: BookOpen },
    { title: "Attendance Rate", value: "87.5%", description: "This week", icon: Calendar, trend: { value: 3, isPositive: true } },
    { title: "Fee Collection", value: "$892K", description: "This month", icon: DollarSign, trend: { value: 8, isPositive: true } },
    { title: "Performance", value: "92.3%", description: "Average grade", icon: TrendingUp, trend: { value: 2, isPositive: true } },
  ];

  const recentActivities = [
    { action: "New student enrolled", subject: "John Smith", time: "2 hours ago" },
    { action: "Course updated", subject: "Computer Science 101", time: "3 hours ago" },
    { action: "Faculty added", subject: "Dr. Sarah Johnson", time: "5 hours ago" },
    { action: "Fee payment received", subject: "Emma Wilson", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening in your campus today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <StatsTile key={s.title} title={s.title} value={s.value} description={s.description} icon={s.icon} trend={s.trend && { value: s.trend.value, positive: s.trend.isPositive }} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <ChartPlaceholder title="Attendance Overview" />
        <RecentActivity items={recentActivities} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <NoticeCard title="Library Hours Extended" date="Oct 10" body="Library will be open until 10 PM" tag="All" />
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <motion.button className="w-full p-4 text-left rounded-xl bg-primary/10 hover:bg-primary/20 backdrop-blur-md transition-all duration-300"
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <p className="font-medium text-primary">Add New Student</p>
                <p className="text-sm text-muted-foreground">Register a new student</p>
              </motion.button>
              <motion.button className="w-full p-4 text-left rounded-xl bg-secondary/10 hover:bg-secondary/20 backdrop-blur-md transition-all duration-300"
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <p className="font-medium text-secondary">Create Announcement</p>
                <p className="text-sm text-muted-foreground">Post campus updates</p>
              </motion.button>
              <motion.button className="w-full p-4 text-left rounded-xl bg-accent/10 hover:bg-accent/20 backdrop-blur-md transition-all duration-300"
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <p className="font-medium text-accent">Generate Report</p>
                <p className="text-sm text-muted-foreground">View analytics</p>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
