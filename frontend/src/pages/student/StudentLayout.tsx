import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentLayout() {
  return (
    <DashboardLayout role="student" userName="John Smith">
      <Outlet />
    </DashboardLayout>
  );
}
