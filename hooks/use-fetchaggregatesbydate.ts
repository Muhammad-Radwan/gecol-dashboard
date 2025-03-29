import { aggregatedMetersByCategory } from "@/lib/AggregatedMetersByCategoryType";
import { apiUrl } from "@/lib/Constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchAggregatesByDate = (companyGuid: String, date1: Date, date2: Date) => {
    
    const fetchData = async (date1: String, date2: String) => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/MeterInstallations/AggregatedMetersByCompanyAndDate?CompanyGuid=${companyGuid}&D1=${date1}&D2=${date2}`
          );
          console.log(`date filtered data: ${response}`);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };
    
      const { data: metersCount, isLoading, error } = useQuery<aggregatedMetersByCategory[]>({
        queryKey: ["CategoriesNoFilter", date1, date2],
        queryFn: () =>
          fetchData(date1?.toLocaleDateString(), date2?.toLocaleDateString()),
      });

      return {metersCount, isLoading, error}

}

export default useFetchAggregatesByDate