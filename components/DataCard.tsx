import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface props {
  title: string;
  subtitle: string;
  value: number;
}

const DataCard = ({ title, subtitle, value }: props) => {
  return (
    <Card className="w-[200px] h-[200px]">
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-2xl">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">{value}</h1>
      </CardContent>
    </Card>
  );
};

export default DataCard;
