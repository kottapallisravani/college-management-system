import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));

// Auth
const StudentLogin = lazy(() => import("./pages/auth/student/Login"));
const StudentSignUp = lazy(() => import("./pages/auth/student/SignUp"));
const FacultyLogin = lazy(() => import("./pages/auth/faculty/Login"));
const FacultySignUp = lazy(() => import("./pages/auth/faculty/SignUp"));
const AdminLogin = lazy(() => import("./pages/auth/AdminLogin"));

// Layouts
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const FacultyLayout = lazy(() => import("./pages/faculty/FacultyLayout"));
const StudentLayout = lazy(() => import("./pages/student/StudentLayout"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminStudents = lazy(() => import("./pages/admin/Students"));
const AdminFaculty = lazy(() => import("./pages/admin/Faculty"));
const AdminCourses = lazy(() => import("./pages/admin/Courses"));
const AdminAttendance = lazy(() => import("./pages/admin/Attendance"));
const AdminExams = lazy(() => import("./pages/admin/Exams"));
const AdminFees = lazy(() => import("./pages/admin/Fees"));
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const AdminAnnouncements = lazy(() => import("./pages/admin/Announcements"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminMess = lazy(() => import("./pages/admin/Mess"));
const AdminTimetable = lazy(() => import("./pages/admin/Timetable"));

// Faculty pages
const FacultyDashboard = lazy(() => import("./pages/faculty/FacultyDashboard"));
const FacultyCourses = lazy(() => import("./pages/faculty/Courses"));
const FacultyAttendance = lazy(() => import("./pages/faculty/Attendance"));
const FacultyStudents = lazy(() => import("./pages/faculty/Students"));
const FacultyMarks = lazy(() => import("./pages/faculty/Marks"));
const FacultyAssignments = lazy(() => import("./pages/faculty/Assignments"));
const FacultyAnnouncements = lazy(() => import("./pages/faculty/Announcements"));
const FacultyProfile = lazy(() => import("./pages/faculty/Profile"));
const FacultyMess = lazy(() => import("./pages/faculty/Mess"));
const FacultyTimetable = lazy(() => import("./pages/faculty/Timetable"));

// Student pages
const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));
const StudentProfile = lazy(() => import("./pages/student/Profile"));
const StudentAttendance = lazy(() => import("./pages/student/Attendance"));
const StudentTimetable = lazy(() => import("./pages/student/Timetable"));
const StudentResults = lazy(() => import("./pages/student/Results"));
const StudentAssignments = lazy(() => import("./pages/student/Assignments"));
const StudentFees = lazy(() => import("./pages/student/Fees"));
const StudentAnnouncements = lazy(() => import("./pages/student/Announcements"));
const StudentMess = lazy(() => import("./pages/student/Mess"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Admin Routes */}
            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/signup/student" element={<StudentSignUp />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login/faculty" element={<FacultyLogin />} />
            <Route path="/signup/faculty" element={<FacultySignUp />} />
            <Route path="/login/admin" element={<AdminLogin />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="timetable" element={<AdminTimetable />} />
              <Route path="exams" element={<AdminExams />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="mess" element={<AdminMess />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Faculty Routes */}
            <Route path="/faculty" element={<FacultyLayout />}>
              <Route index element={<FacultyDashboard />} />
              <Route path="courses" element={<FacultyCourses />} />
              <Route path="attendance" element={<FacultyAttendance />} />
              <Route path="students" element={<FacultyStudents />} />
              <Route path="marks" element={<FacultyMarks />} />
              <Route path="assignments" element={<FacultyAssignments />} />
              <Route path="announcements" element={<FacultyAnnouncements />} />
              <Route path="timetable" element={<FacultyTimetable />} />
              <Route path="profile" element={<FacultyProfile />} />
              <Route path="mess" element={<FacultyMess />} />
            </Route>

            {/* Student Routes */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="timetable" element={<StudentTimetable />} />
              <Route path="results" element={<StudentResults />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="announcements" element={<StudentAnnouncements />} />
              <Route path="mess" element={<StudentMess />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
