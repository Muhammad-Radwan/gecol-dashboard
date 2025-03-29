"use client";
import CustomField from "@/components/CustomField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { apiUrl } from "@/lib/Constants";
import { userType } from "@/lib/EmployeeType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
const userFormSchema = z.object({
  userName: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(1, "يجب إدخال بيانات بشكل صحيح"),
  password: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(1, "يجب إدخال بيانات بشكل صحيح"),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();

  const qc = useQueryClient();

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const fetchData = async (data: z.infer<typeof userFormSchema>) => {
    try {
      const url = `${apiUrl}/api/employees/login?UserName=${data.userName}&Password=${data.password}`;

      const response = await axios.get(url);

      setIsLoading(false);
      const userGuide = response.data.employeeGuid;

      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userGuide }),
      });

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("لا يمكن تسجيل الدخول", {
        description: "يوجد خطأ في بيانات الدخول",
        action: {
          label: "حسناً",
          onClick: () => {},
        },
      });
    }
  };

  const mutation = useMutation({
    mutationFn: fetchData,
    onSuccess: (data: userType) => {
      if (data) {
        qc.setQueryData(["UserData"], data);

        route.push("/dashboard");
      }
    },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <Card className="h-[450px] w-[450px] justify-center gap-5">
      <CardHeader>
        <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CustomField
              name="userName"
              isPassword={false}
              label="اسم المستخدم"
              fieldType=""
            />

            <CustomField
              name="password"
              isPassword={true}
              label="كلمة المرور"
              fieldType="password"
            />

            <div className="flex items-center justify-between">
              <Button disabled={mutation.isPending} type="submit">
                تسجيل الدخول {isLoading && <Loader2 />}
              </Button>
            </div>
          </form>
        </Form>
        <Toaster richColors />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
