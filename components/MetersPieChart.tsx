"use client";

import useFetchAggregates from "@/hooks/use-fetchaggregates";
import { Loader2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

interface props {
  companyGuid: string;
}

export function MetersChart({ companyGuid }: props) {
  const { isLoading, metersCount, error } = useFetchAggregates(companyGuid);
  if (isLoading) return <Loader2 />;
  if (error) return <h1>error</h1>;

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];

  const chartConfig = {
    count: {
      label: "العدد",
    },
    تجاري: {
      label: "تجاري",
      color: "hsl(var(--chart-1))",
    },
    منزلي: {
      label: "منزلي",
      color: "hsl(var(--chart-2))",
    },
    زراعي: {
      label: "منزلي",
      color: "hsl(var(--chart-3))",
    },
    صناعي: {
      label: "منزلي",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  if (isLoading) return <Loader2 />
  if (error) return <h1>لا يمكن عرض البيانات حالياً</h1>
  if (!metersCount?.length) return <h1>لا توجد بيانات للتمثيل البياني</h1>
  return (
    <ChartContainer config={chartConfig} className="min-h-[100px] w-200">
      <BarChart width={150} height={40} data={metersCount}>
        <CartesianGrid vertical={false} />
        <XAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          dataKey="category"
        />
        <YAxis dataKey="count"/>
        <Bar dataKey="count" fill="#8884d8">
          {metersCount?.map((entry, index) => (
            <Cell values={entry.category} key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell>
          ))}
        </Bar>
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}
