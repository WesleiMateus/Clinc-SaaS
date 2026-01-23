import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./components/button-sign-out";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersToClinicsTable } from "@/db/schema";

const dashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  // Pegar as clincas do usuario
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if(clinics.length === 0) {
    redirect("/clinic-form")
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
