"use client";

import DataCard from "@/components/DataCard";
import TotalsByTypeChart from "@/components/TotalsByTypeChart";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userType } from "@/lib/EmployeeType";

import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const sharedData = queryClient.getQueryData<userType>(["UserData"]);

  return (
    <div className="flex flex-col p-5 gap-5">
      <h1 className="text-4xl">مرحباً بك: {sharedData?.employeeName}</h1>
      <Card>
        <CardContent className="gap-5">
          <Input type="date" />
          <Input type="date" />
        </CardContent>
      </Card>
      <div className="gap-5 grid grid-cols-4">
        <DataCard title="زراعي" subtitle="عنوان فرعي" value={3000} />
        <DataCard title="تجاري" subtitle="عنوان فرعي" value={4000} />
        <DataCard title="صناعي" subtitle="عنوان فرعي" value={5000} />
        <DataCard title="منزلي" subtitle="عنوان فرعي" value={6000} />
      </div>
      <TotalsByTypeChart />
    </div>
  );
};

export default Dashboard;
