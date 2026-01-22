import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/register";
import LoginPage from "./components/login";

const AuthenticationPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
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
