import { aggregatedMetersByCategory } from '@/lib/AggregatedMetersByCategoryType';
import { apiUrl } from '@/lib/Constants';
import { MeterListType } from '@/lib/MetersListType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchAllmeters = (companyGuid: String) => {
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/MeterInstallations/GetMetersByCompanyNoLimit?CompanyGuid=${companyGuid}`
          );
          console.log(response)
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };

      const {isLoading, error, data: meters} = useQuery<MeterListType[]>({
        queryKey: ["CategoriesNoFilter"],
        queryFn: fetchData
      })
  return {isLoading, error, meters}
}

export default useFetchAllmeters