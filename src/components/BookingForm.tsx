import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { useToast } from "@/components/ui/use-toast";
import { bookingsState, createBooking } from "@/store/bookingStore";
import { LabSelectionCards, labs } from "./LabSelectionCards";
import { BookingDetailsForm } from "./BookingDetailsForm";

export const BookingForm = () => {
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const setBookings = useSetRecoilState(bookingsState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLab) return;

    const selectedLabData = labs.find(lab => lab.id === selectedLab);
    if (!selectedLabData) return;

    try {
      const newBooking = await createBooking({
        lab: selectedLabData.name,
        date,
        time,
        issue,
        description,
      });

      setBookings((prevBookings) => [...prevBookings, newBooking]);
      
      toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${selectedLabData.name} on ${date} at ${time} has been confirmed.`,
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!selectedLab) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Select a Laboratory</h2>
        <LabSelectionCards onLabSelect={setSelectedLab} />
      </div>
    );
  }

  return (
    <BookingDetailsForm
      selectedLab={selectedLab}
      issue={issue}
      setIssue={setIssue}
      description={description}
      setDescription={setDescription}
      date={date}
      setDate={setDate}
      time={time}
      setTime={setTime}
      onBack={() => setSelectedLab(null)}
      onSubmit={handleSubmit}
    />
  );
};