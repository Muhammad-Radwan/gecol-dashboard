import { apiUrl } from "@/lib/Constants";
import { MeterDefectType } from "@/lib/MeterDefectType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchMeterDefect = (date1: Date, date2: Date) => {
    
    const fetchData = async (date01: String, date02: String) => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/MeterHistories/GetDefectReportByDate?FromDate=${date01}&ToDate=${date02}`
          );
          console.log(`date filtered data: ${response}`);
          return response.data;
        } catch (error) {
          console.log(date01);
        }
      };
    
      const { data: meterDefects, isLoading, error } = useQuery<MeterDefectType[]>({
        queryKey: ["MeterDefects", date1, date2],
        queryFn: () =>
          fetchData(date1.toLocaleDateString(), date2.toLocaleDateString()),
      });

      return {meterDefects, isLoading, error}

}

export default useFetchMeterDefect