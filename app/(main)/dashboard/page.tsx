"use client";

import DataCardsContainer from "@/components/DataCardsContainer";
import GMap from "@/components/GMap";
import { userType } from "@/lib/EmployeeType";

import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const sharedData = queryClient.getQueryData<userType>(["UserData"]);

  return (
    <div className="flex flex-col p-5 gap-5">
      <h1 className="text-5xl">{sharedData?.company.companyName}</h1>
      <h1 className="text-3xl">مرحباً بك: {sharedData?.employeeName}</h1>

      <div className="flex items-center justify-center w-screen">
        <DataCardsContainer companyGuid={sharedData?.companyGuid || ''} />
      </div>
        <GMap />
      
    </div>
  );
};

export default Dashboard;
