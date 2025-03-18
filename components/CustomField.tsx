import { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props {
  name: string;
  isPassword: boolean;
  label: string;
  fieldType: string;
}

const CustomField = ({ name, label, fieldType }: Props) => {
  const renderInput = (field: ControllerRenderProps) => {
    switch (fieldType) {
      case "password":
        return <Input type="password" placeholder={label} {...field} />;
      case "number":
        return <Input type="number" placeholder={label} {...field} />;
      default:
        return <Input placeholder={label} {...field} />;
    }
  };
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
            <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
