import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AdminLayout() {
  return (
    <DashboardLayout role="admin" userName="Admin User">
      <Outlet />
    </DashboardLayout>
  );
}
