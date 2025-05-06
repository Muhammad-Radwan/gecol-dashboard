import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FaCalendar } from "react-icons/fa";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface props {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder: string;
}
const MyDatePicker = ({ selectedDate, onDateChange, placeholder }: props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-[280px] justify-start text-left font-normal ml-1.5",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <FaCalendar />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          dir="rtl"
          className="w-auto p-0"
          mode="single"
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default MyDatePicker;
