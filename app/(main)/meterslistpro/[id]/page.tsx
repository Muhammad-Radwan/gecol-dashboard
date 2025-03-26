'use client'

import { apiUrl } from "@/lib/Constants";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MeterListType } from "@/lib/MetersListType";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MetersListPro = () => {
  const [page, setPage] = useState<number>(1)

  const params = useParams();

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/MeterInstallations/GetMetersByCompany?CompanyGuid=${params.id}&Page=${page}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data } = useQuery<MeterListType[]>({
    queryKey: ['meterslistpro', page],
    queryFn: () => fetchData(page)
  })
  
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex gap-3 items-center mb-3">
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          السابق
        </Button>
        <span>
          الصفحة {page}
        </span>
        <Button onClick={() => setPage((prev) => prev + 1)} >
          التالي
        </Button>
      </div>

      <DataTable columns={columns} data={data || []} />
    </div>
    
  )
};

export default MetersListPro;
