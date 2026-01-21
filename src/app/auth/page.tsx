"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpForm from "./components/register";
import LoginPage from "./components/login";

const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "Email é obrigaório!" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
});

const AuthenticationPage = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log(data);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Tabs defaultValue="login" className="w-120">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastro</TabsTrigger>
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
