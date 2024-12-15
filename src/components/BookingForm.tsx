import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBookings } from "@/contexts/BookingContext";

const labNames = {
  soil: "Soil Testing Lab",
  plant: "Plant Pathology Lab",
  water: "Water Quality Lab",
};

export const BookingForm = () => {
  const [lab, setLab] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addBooking } = useBookings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addBooking({
      lab: labNames[lab as keyof typeof labNames],
      date,
      time,
    });
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${labNames[lab as keyof typeof labNames]} on ${date} at ${time} has been confirmed.`,
    });
    
    navigate("/");
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Book a Lab</CardTitle>
        <CardDescription>
          Select your preferred lab, date, and time slot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Lab</label>
            <Select onValueChange={setLab} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose a lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soil">Soil Testing Lab</SelectItem>
                <SelectItem value="plant">Plant Pathology Lab</SelectItem>
                <SelectItem value="water">Water Quality Lab</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <input
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time</label>
            <Select onValueChange={setTime} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};