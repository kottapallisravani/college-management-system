import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function FacultyLayout() {
  return (
    <DashboardLayout role="faculty" userName="Dr. Sarah Johnson">
      <Outlet />
    </DashboardLayout>
  );
}
