"use client";

import { AppSidebar } from "@/components/AppSidebar";
import DataCardsContainer from "@/components/DataCardsContainer";
import GMap from "@/components/GMap";
import { MetersChart } from "@/components/MetersPieChart";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userType } from "@/lib/EmployeeType";

import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const sharedData = queryClient.getQueryData<userType>(["UserData"]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex flex-col p-5 gap-5">
        <h1 className="text-5xl">{sharedData?.company.companyName}</h1>
        <h1 className="text-3xl">مرحباً بك: {sharedData?.employeeName}</h1>

        <div className="flex justify-start w-screen">
          <MetersChart companyGuid={sharedData?.companyGuid || ""} />
        </div>

        <div className="flex items-center justify-start w-screen">
          <DataCardsContainer companyGuid={sharedData?.companyGuid || ""} />
        </div>

        <GMap companyGuid={sharedData?.companyGuid || ""} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
