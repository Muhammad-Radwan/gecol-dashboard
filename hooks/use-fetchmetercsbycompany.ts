import { aggregatedMetersByCategory } from '@/lib/AggregatedMetersByCategoryType';
import { apiUrl } from '@/lib/Constants';
import { MeterListType } from '@/lib/MetersListType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchMeterCsByCompany = (companyGuid: String) => {
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/MeterCs/pivotbycompany?CompanyGuid=${companyGuid}`
          );
          console.log(response)
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };

      const {isLoading, error, data: metercs} = useQuery<Record<string, any>[]>({
        queryKey: ["MeterCsPivotByCompany"],
        queryFn: fetchData
      })
  return {isLoading, error, metercs}
}

export default useFetchMeterCsByCompany