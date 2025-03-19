"use client";

import AdministrationSelect from "@/components/AdministrationSelect";
import CompanyTypeSelect from "@/components/CompanyTypeSelect";
import CustomField from "@/components/CustomField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
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
import { LucideClockFading } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { v4 } from "uuid";
import { z } from "zod";

const createCompanySchema = z.object({
  companyName: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .min(4, "يجب إدخال بيانات بشكل صحيح"),

  companyType: z.number().min(1, "يجب إدخال بيانات بشكل صحيح"),

  administrationId: z.number().min(1, "يجب إدخال بيانات بشكل صحيح"),

  mainCompanyGuid: z.string().min(16, "يجب إدخال بيانات بشكل صحيح"),
});



const CreateCompanyPage = () => {
  const route = useRouter();

  const companyForm = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      companyType: 2,
      administrationId: 12,
      companyName: "",
      mainCompanyGuid: "",
    },
  });

  const fetchAllCompanies = async () => {
    try {
      const url = `${apiUrl}/api/companies/all?Page=1`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.log(error)
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

  const {
    data: companies,
    isLoading,
  } = useQuery<company[]>({
    queryKey: ["companies"],
    queryFn: fetchAllCompanies,
  });

  const uploadData = async (
    newCompanyData: z.infer<typeof createCompanySchema>
  ) => {
    try {
      const url = `${apiUrl}/api/companies/create`;

      const newCompany = {
        cardGuide: v4(),
        companyName: newCompanyData.companyName,
        companyType: newCompanyData.companyType,
        administrationId: newCompanyData.administrationId,
        mainCompanyGuid: newCompanyData.mainCompanyGuid,
      };

      const response = await axios.post(url, newCompany, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      route.push('/dashboard')
      console.log(response);
    } catch (error) {

      console.log(error)
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
    mutationFn: uploadData,
  });

  async function onSubmit(values: z.infer<typeof createCompanySchema>) {
    mutation.mutate(values);
  }

  return (
    <Card className="h-[550px] w-[450px] justify-center gap-5">
      <CardHeader>
        <CardTitle className="text-2xl">إنشاء شركة جديدة</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...companyForm}>
          <form
            onSubmit={companyForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CustomField  
              name="companyName"
              isPassword={false}
              label="اسم الشركة"
              fieldType=""
            />

            <CompanyTypeSelect />

            <AdministrationSelect />
            
            {isLoading && <h1>جار تحميل الشركات</h1>}
            <FormField
              control={companyForm.control}
              name="mainCompanyGuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الشركة الرئيسية</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                إنشاء الشركة {mutation.isPending && <LucideClockFading />}
              </Button>
            </div>
          </form>
        </Form>
        <Toaster richColors/>
      </CardContent>
    </Card>
  );
};

export default CreateCompanyPage;
