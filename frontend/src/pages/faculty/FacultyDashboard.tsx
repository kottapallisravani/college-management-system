import { motion } from "framer-motion";
import { BookOpen, Users, Calendar, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsTile } from "@/components/StatsTile";
import { ChartPlaceholder } from "@/components/ChartPlaceholder";
import { AssignmentCard } from "@/components/AssignmentCard";
import { RecentActivity } from "@/components/RecentActivity";

export default function FacultyDashboard() {
  const stats = [
    { title: "My Courses", value: 5, description: "Active courses", icon: BookOpen },
    { title: "Total Students", value: 182, description: "Across all courses", icon: Users },
    { title: "Classes Today", value: 3, description: "Scheduled classes", icon: Calendar },
    { title: "Pending Evaluations", value: 24, description: "Assignments to grade", icon: FileText },
  ];

  const todayClasses = [
    { course: "Computer Science 101", time: "09:00 AM - 10:30 AM", room: "Room 204" },
    { course: "Data Structures", time: "11:00 AM - 12:30 PM", room: "Lab 3" },
    { course: "Algorithms", time: "02:00 PM - 03:30 PM", room: "Room 305" },
  ];

  const recentSubmissions = [
    { action: "Assignment submitted", subject: "Assignment 3 - CS101", time: "1 hour ago" },
    { action: "Assignment submitted", subject: "Lab Report - DS201", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Faculty Dashboard</h1>
        <p className="text-muted-foreground">
          Good morning! Here's your schedule and updates for today.
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
            <CardTitle>Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((c, i) => (
                <motion.div key={i} className="p-3 border rounded"
                  whileHover={{ y: -1, scale: 1.005 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                >
                  <div className="font-medium">{c.course}</div>
                  <div className="text-sm text-muted-foreground">{c.time} • {c.room}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <ChartPlaceholder title="Class Attendance (Month)" />
          <RecentActivity items={recentSubmissions} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AssignmentCard title="Assignment 3" course="CS101" due="2 days" submitted={12} total={30} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-3 text-left rounded-lg bg-primary/10">Mark Attendance</button>
                <button className="w-full p-3 text-left rounded-lg bg-secondary/10">Upload Marks</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
