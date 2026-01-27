import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./_components/button-sign-out";
import { redirect } from "next/navigation";

const dashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <SignOutButton />
    </div>
  );
};

export default dashboardPage;
