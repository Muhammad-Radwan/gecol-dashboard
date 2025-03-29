import { aggregatedMetersByCategory } from '@/lib/AggregatedMetersByCategoryType';
import { apiUrl } from '@/lib/Constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchAggregates = (companyGuid: String) => {
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/MeterInstallations/AggregatedMetersByCompany?CompanyGuid=${companyGuid}`
          );
          console.log(response)
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };

      const {isLoading, error, data: metersCount} = useQuery<aggregatedMetersByCategory[]>({
        queryKey: ["CategoriesNoFilter"],
        queryFn: fetchData
      })
  return {isLoading, error, metersCount}
}

export default useFetchAggregates