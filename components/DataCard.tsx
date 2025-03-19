import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface props {
  title: string;
  subtitle: string;
  value: number;
}

const DataCard = ({ title, subtitle, value }: props) => {
  return (
    <Card className="w-[150px] h-[150px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl font-bold">{value}</h1>
      </CardContent>
    </Card>
  );
};

export default DataCard;
