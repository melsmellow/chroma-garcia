import { auth } from "@/auth";
import AdminShell from "@/components/admin/AdminShell";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <AdminShell
      user={{
        name: session.user.name,
        role: session.user.role,
      }}
    >
      {children}
    </AdminShell>
  );
}