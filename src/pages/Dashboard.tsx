import { Button } from "@/components/ui/button";
import { UpcomingBookings } from "@/components/UpcomingBookings";
import { useNavigate } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { useRecoilValue } from 'recoil';
import { bookingsSelector } from "@/store/bookingStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const bookings = useRecoilValue(bookingsSelector);

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

      {bookings.length > 0 ? (
        <UpcomingBookings />
      ) : (
        <div className="mb-12 text-center">
          <p className="text-gray-600 mb-8">
            You don't have any upcoming bookings. Click the New Booking button to schedule your first appointment!
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;