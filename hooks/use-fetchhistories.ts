import { apiUrl } from "@/lib/Constants";
import { MeterHistoryType } from "@/lib/MeterHistoryType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchHistories = (companyGuid: String, page: number) => {
    const fetchData = async (page: number) => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/MeterHistories/bycompanylimited?Page=${page}&CompanyGuid=${companyGuid}`
          );
          console.log(response)
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };

      const {isLoading, error, data: meters} = useQuery<MeterHistoryType[]>({
        queryKey: ["MeterHistories", page],
        queryFn: () => fetchData(page)
      })
  return {isLoading, error, meters}
}

export default useFetchHistories