import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/register";
import LoginPage from "./components/login";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AuthenticationPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-950 dark">
      <Tabs defaultValue="login" className="w-110">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastre-se</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginPage />
        </TabsContent>

        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
