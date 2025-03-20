import { apiUrl } from "@/lib/Constants";
import axios from "axios";
import DataCard from "./DataCard";
import { useQuery } from "@tanstack/react-query";
import { aggregatedMetersByCategory } from "@/lib/AggregatedMetersByCategoryType";

interface props {
  companyGuid: string
}

const DataCardsContainer = ({companyGuid} : props) => {
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

  const {data: metersCount} = useQuery<aggregatedMetersByCategory[]>({
    queryKey: ["CategoriesNoFilter"],
    queryFn: fetchData
  })
  return (
    <div className="gap-5 grid grid-cols-4">
        {metersCount?.map(x => (
            <DataCard key={x.category} title={x.category!} subtitle="عنوان فرعي" value={x.count!} />
        ))}
    </div>
  );
};

export default DataCardsContainer;
