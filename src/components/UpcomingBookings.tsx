import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";
import { useRecoilValue } from 'recoil';
import { bookingsSelector } from "@/store/bookingStore";

export const UpcomingBookings = () => {
  const bookings = useRecoilValue(bookingsSelector);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/10 transition-colors"
            >
              <CalendarDays className="text-primary" size={24} />
              <div className="flex-1">
                <h3 className="font-medium">{booking.lab}</h3>
                <div className="flex gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={16} />
                    {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {booking.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};