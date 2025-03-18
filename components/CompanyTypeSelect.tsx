import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const types = [
  { id: 1, name: "شركة منفذة" },
  { id: 2, name: "شركة مكلفة / منفذة" },
];

const CompanyTypeSelect = () => {
  return (
    <FormField
      name="administrationId"
      render={({ field }) => (
        <FormItem className="w-450">
          <FormLabel>نوع الشركة</FormLabel>
          <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue='1'>
            <FormControl>
              <SelectTrigger className="w-[400px]">
                <SelectValue placeholder="اختر من القائمة" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyTypeSelect;
