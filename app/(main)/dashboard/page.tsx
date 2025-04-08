"use client";

import { AppSidebar } from "@/components/AppSidebar";
import DataCardsContainer from "@/components/DataCardsContainer";
import GMap from "@/components/GMap";
import { MetersChart } from "@/components/MetersPieChart";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userType } from "@/lib/EmployeeType";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const queryClient = useQueryClient();

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
        <h1 className="text-5xl">{userData?.company.companyName}</h1>
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
