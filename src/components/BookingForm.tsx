import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
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
import { useToast } from "@/components/ui/use-toast";
import { bookingsState } from "@/store/bookingStore";
import { TestTube2, Leaf, Droplets } from "lucide-react";

const labs = [
  {
    id: "soil",
    name: "Soil Testing Lab",
    description: "Comprehensive soil analysis for optimal crop growth",
    icon: TestTube2,
  },
  {
    id: "plant",
    name: "Plant Pathology Lab",
    description: "Diagnose and treat plant diseases effectively",
    icon: Leaf,
  },
  {
    id: "water",
    name: "Water Quality Lab",
    description: "Test water quality for irrigation and farming needs",
    icon: Droplets,
  },
];

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

export const BookingForm = () => {
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const setBookings = useSetRecoilState(bookingsState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLab) return;

    const selectedLabData = labs.find(lab => lab.id === selectedLab);
    if (!selectedLabData) return;

    setBookings((prevBookings) => [
      ...prevBookings,
      {
        id: prevBookings.length ? Math.max(...prevBookings.map((b) => b.id)) + 1 : 1,
        lab: selectedLabData.name,
        date,
        time,
        issue,
        description,
      },
    ]);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${selectedLabData.name} on ${date} at ${time} has been confirmed.`,
    });
    
    navigate("/");
  };

  if (!selectedLab) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Select a Laboratory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => {
            const Icon = lab.icon;
            return (
              <Card 
                key={lab.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedLab(lab.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">{lab.name}</CardTitle>
                  </div>
                  <CardDescription>{lab.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Booking</CardTitle>
        <CardDescription>
          Fill in the details for your appointment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              onClick={() => setSelectedLab(null)}
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