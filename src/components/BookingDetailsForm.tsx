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
import { Textarea } from "@/components/ui/textarea";

interface BookingDetailsFormProps {
  selectedLab: string;
  issue: string;
  setIssue: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const commonIssues = {
  soil: [
    "Nutrient Deficiency",
    "pH Imbalance",
    "Soil Structure Problems",
    "Other",
  ],
  plant: [
    "Disease Diagnosis",
    "Pest Infestation",
    "Growth Issues",
    "Other",
  ],
  water: [
    "Quality Testing",
    "Contamination Check",
    "Mineral Analysis",
    "Other",
  ],
};

export const BookingDetailsForm = ({
  selectedLab,
  issue,
  setIssue,
  description,
  setDescription,
  date,
  setDate,
  time,
  setTime,
  onBack,
  onSubmit,
}: BookingDetailsFormProps) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Booking</CardTitle>
        <CardDescription>
          Fill in the details for your appointment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Issue</label>
            <Select onValueChange={setIssue} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose your issue" />
              </SelectTrigger>
              <SelectContent>
                {commonIssues[selectedLab as keyof typeof commonIssues].map((issue) => (
                  <SelectItem key={issue} value={issue}>
                    {issue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Describe Your Issue</label>
            <Textarea
              placeholder="Please provide more details about your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              required
            />
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

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};