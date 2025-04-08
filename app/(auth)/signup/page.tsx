"use client";
import CustomField from "@/components/CustomField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { company } from "@/lib/CompanyType";
import { apiUrl } from "@/lib/Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { v4 } from "uuid";
import { z } from "zod";

const userFormSchema = z.object({
  employeeName: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(1, "يجب إدخال بيانات بشكل صحيح"),
  loginId: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(1, "يجب إدخال بيانات بشكل صحيح"),
  password: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(1, "يجب إدخال بيانات بشكل صحيح"),
  passwordConfirm: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(1, "يجب إدخال بيانات بشكل صحيح"),
  companyGuid: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(16, "يجب إدخال بيانات بشكل صحيح"),
  isITUser: z.boolean(),
});

const SignupPage = () => {
  const route = useRouter();

  // const qc = useQueryClient();

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      employeeName: "",
      loginId: "",
      password: "",
      passwordConfirm: "",
      isITUser: false,
    },
  });

  const fetchAllCompanies = async () => {
    try {
      const url = `${apiUrl}/api/companies/all?Page=1`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("لا يمكن الحصول على بيانات الشركة", {
        description: "حدث خطأ أثناء محاولة تنزيل الشركة",
        action: {
          label: "حسناً",
          onClick: () => {},
        },
      });
      return [];
    }
  };

  const { data: companies, isLoading } = useQuery<company[]>({
    queryKey: ["companies"],
    queryFn: fetchAllCompanies,
  });

  const createUser = async (newEmployee: z.infer<typeof userFormSchema>) => {
    try {
      const url = `${apiUrl}/api/employees/create`;

      const newCompany = {
        cardGuide: v4(),
        employeeName: newEmployee.employeeName,
        loginId: newEmployee.loginId,
        password: newEmployee.passwordConfirm,
        companyGuid: newEmployee.companyGuid,
        isITUser: newEmployee.isITUser,
      };

      await axios.post(url, newCompany, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("لا يمكن إنشاء الشركة", {
        description: "حدث خطأ أثناء محولة إنشاء الشركة",
        action: {
          label: "حسناً",
          onClick: () => {},
        },
      });
    }
  };

  const mutation = useMutation({
    mutationFn: createUser,
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <Card className="h-[650px] w-[450px] justify-center gap-5">
      <CardHeader>
        <CardTitle className="text-2xl">إنشاء مستخدم</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CustomField
              name="employeeName"
              isPassword={false}
              label="اسم المستخدم"
              fieldType=""
            />

            <CustomField
              name="loginId"
              isPassword={false}
              label="معرف الدخول"
              fieldType=""
            />

            <CustomField
              name="password"
              isPassword={false}
              label="كلمة المرور"
              fieldType="password"
            />

            <CustomField
              name="passwordConfirm"
              isPassword={false}
              label="تأكيد كلمة المرور"
              fieldType="password"
            />
            {isLoading && <h1>جار تحميل الشركات</h1>}
            <FormField
              name="companyGuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الشركة الرئيسية</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[400px]">
                        <SelectValue placeholder="اختر من القائمة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies?.map((comp) => (
                        <SelectItem key={comp.cardGuide} value={comp.cardGuide}>
                          {comp.companyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button disabled={mutation.isPending} type="submit">
                إنشاء الشركة
              </Button>
            </div>
          </form>
        </Form>
        <Toaster richColors />
      </CardContent>
    </Card>
  );
};

export default SignupPage;
