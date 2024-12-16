import { Button } from "@/components/ui/button";
import { UpcomingBookings } from "@/components/UpcomingBookings";
import { useNavigate } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { useSetRecoilState } from 'recoil';
import { bookingsState, fetchBookings } from "@/store/bookingStore";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const setBookings = useSetRecoilState(bookingsState);
  const { toast } = useToast();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookings = await fetchBookings();
        setBookings(bookings);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load bookings. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    loadBookings();
  }, [setBookings, toast]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome, Farmer!</h1>
          <p className="text-gray-600 mt-2">
            Manage your lab bookings and schedule new appointments
          </p>
        </div>
        <Button
          onClick={() => navigate("/book")}
          className="flex items-center gap-2"
        >
          <CalendarPlus size={20} />
          New Booking
        </Button>
      </div>

      <UpcomingBookings />
    </div>
  );
};

export default Dashboard;