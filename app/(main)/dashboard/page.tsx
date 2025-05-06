"use client";

import { AppSidebar } from "@/components/AppSidebar";
import DataCardsContainer from "@/components/DataCardsContainer";
import GMap from "@/components/GMap";
import { MetersChart } from "@/components/MetersPieChart";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userType } from "@/lib/EmployeeType";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { setTheme } = useTheme();
  const [userData, setUserData] = useState<userType | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      queryClient.setQueryData(["UserData"], parsed);
      setUserData(parsed); // optional, for immediate access
    }
  }, []);

  const queryData = queryClient.getQueryData<userType>(["UserData"]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex flex-col p-5 gap-5">
        <div className="flex flex-row">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                فاتح
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                غامق
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                حسب النظام
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <h1 className="text-5xl mr-5">{userData?.company.companyName}</h1>
        </div>
        <h1 className="text-3xl">مرحباً بك: {userData?.employeeName}</h1>

        <div className="flex justify-start w-screen">
          <MetersChart companyGuid={queryData?.companyGuid || ""} />
        </div>

        <div className="flex items-center justify-start w-screen">
          <DataCardsContainer companyGuid={queryData?.companyGuid || ""} />
        </div>

        {/* <h1>{userData?.companyGuid}</h1> */}
        <GMap companyGuid={queryData?.companyGuid || ""} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
