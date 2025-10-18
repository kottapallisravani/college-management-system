import { motion } from "framer-motion";
import { Calendar, FileText, TrendingUp, DollarSign, BookOpen, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsTile } from "@/components/StatsTile";
import { AttendanceCard } from "@/components/AttendanceCard";
import { AssignmentCard } from "@/components/AssignmentCard";
import { ChartPlaceholder } from "@/components/ChartPlaceholder";

export default function StudentDashboard() {
  const stats = [
    { title: "Attendance", value: "89.5%", description: "This semester", icon: Calendar, trend: { value: 2, isPositive: true } },
    { title: "CGPA", value: "8.7", description: "Current semester", icon: TrendingUp, trend: { value: 0.3, isPositive: true } },
    { title: "Pending Assignments", value: 3, description: "Due this week", icon: FileText },
    { title: "Fee Status", value: "Paid", description: "All clear", icon: DollarSign },
  ];

  const upcomingClasses = [
    { subject: "Mathematics", time: "09:00 AM - 10:00 AM", room: "Room 101" },
    { subject: "Physics Lab", time: "11:00 AM - 01:00 PM", room: "Lab 2" },
    { subject: "English Literature", time: "02:00 PM - 03:00 PM", room: "Room 205" },
  ];

  const assignments = [
    { title: "Calculus Problem Set", course: "Mathematics", due: "2 days", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your academic overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <StatsTile key={s.title} title={s.title} value={s.value} description={s.description} icon={s.icon} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((c, i) => (
                <motion.div key={i} className="p-3 border rounded"
                  whileHover={{ y: -1, scale: 1.005 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                >
                  <div className="font-medium">{c.subject}</div>
                  <div className="text-sm text-muted-foreground">{c.time} • {c.room}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <ChartPlaceholder title="Attendance Trend" />
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <AssignmentCard title={assignments[0].title} course={assignments[0].course} due={assignments[0].due} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="font-medium">Mid-term Examination Schedule Released</div>
              <div className="text-sm text-muted-foreground mt-1">Check your schedule for exam dates and timings.</div>
              <div className="text-xs text-muted-foreground">Posted 2 days ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
