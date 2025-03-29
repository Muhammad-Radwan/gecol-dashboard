import DataCard from "./DataCard";
import useFetchAggregates from "@/hooks/use-fetchaggregates";
import { Loader2 } from "lucide-react";

interface props {
  companyGuid: string
}

const DataCardsContainer = ({companyGuid} : props) => {
  const {isLoading, metersCount, error} = useFetchAggregates(companyGuid)

  if(isLoading) return <Loader2 />
  if(error) return <h1>لم يتم تحميل البيانات بشكل صحيح</h1>
  if (!metersCount?.length) return <h1>لا توجد بيانات لعرض البطاقات</h1>
  return (
    <div className="gap-5 grid grid-cols-4">
        {metersCount?.map(x => (
            <DataCard key={x.category} title={x.category!} subtitle="عنوان فرعي" value={x.count!} />
        ))}
    </div>
  );
};

export default DataCardsContainer;
