import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 relative z-[1]">{children}</main>
    </div>
  );
}
