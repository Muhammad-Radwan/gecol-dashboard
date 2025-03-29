import { Loader2 } from "lucide-react";
import DataCard from "./DataCard";
import useFetchAggregatesByDate from "@/hooks/use-fetchaggregatesbydate";

interface props {
  companyGuid: string;
  d1: Date;
  d2: Date;
}

const DataCardsContainerDate = ({ companyGuid, d1, d2 }: props) => {
  const {metersCount, isLoading, error} = useFetchAggregatesByDate(companyGuid, d1, d2)

  if (isLoading) return <Loader2 />;
  if (!metersCount?.length) return <h1 className="text-2xl">لا توجد بيانات</h1>;
  if (error) return <h1>حدث خطأ أثناء تحميل البيانات</h1>
  return (
    <div className="gap-5 grid grid-cols-4">
      {metersCount?.map((x) => (
        <DataCard
          key={x.category}
          title={x.category!}
          subtitle="عنوان فرعي"
          value={x.count!}
        />
      ))}
    </div>
  );
};

export default DataCardsContainerDate;
