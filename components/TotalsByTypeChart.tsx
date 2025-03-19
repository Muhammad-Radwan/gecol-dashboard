"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { domestic: 200 },
  { commercial: 300 },
  { agricultural: 150 },
  { industrail: 400 },
];

const chartConfig = {
  domestic: {
    label: "منزلي",
    color: "hsl(var(--chart-1))",
  },
  commercial: {
    label: "تجاري",
    color: "#60a5fa",
  },
  agricultural: {
    label: "زراعي",
    color: "#2563eb",
  },
  industrail: {
    label: "صناعي",
    color: "#60a5fa",
  }
} satisfies ChartConfig;

const TotalsByTypeChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        
      <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="industrail" fill="var(--chart-4)" radius={4} />
        <Bar dataKey="agricultural" fill="var(--chart-3)" radius={4} />
        <Bar dataKey="commercial" fill="var(--chart-2)" radius={4} />
        <Bar dataKey="domestic" fill="var(--chart-1)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default TotalsByTypeChart;
