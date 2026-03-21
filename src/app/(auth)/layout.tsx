import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Sidebar } from "@/components/layout/sidebar";
import { TrialBanner } from "@/components/paywall/trial-banner";
import { daysLeftInTrial, hasAccess } from "@/lib/subscription";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  // Expired trial without subscription → redirect to pricing
  if (!hasAccess(user)) {
    redirect("/pricing");
  }

  const trialDays = daysLeftInTrial(user);

  return (
    <div className="min-h-screen bg-background">
      {user.plan === "TRIAL" && trialDays > 0 && (
        <TrialBanner daysLeft={trialDays} />
      )}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
