import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, TestTube2, Leaf, Droplets } from "lucide-react";
import { Booking, cancelBooking } from "@/store/bookingStore";
import { useSetRecoilState } from 'recoil';
import { bookingsState } from "@/store/bookingStore";
import { useToast } from "@/components/ui/use-toast";

interface BookingDetailsDialogProps {
  booking: Booking;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getLabIcon = (labName: string) => {
  switch (labName) {
    case "Soil Testing Lab":
      return TestTube2;
    case "Plant Pathology Lab":
      return Leaf;
    case "Water Quality Lab":
      return Droplets;
    default:
      return TestTube2;
  }
};

export const BookingDetailsDialog = ({
  booking,
  open,
  onOpenChange,
}: BookingDetailsDialogProps) => {
  const Icon = getLabIcon(booking.lab);
  const setBookings = useSetRecoilState(bookingsState);
  const { toast } = useToast();

  const handleCancelBooking = async () => {
    try {
      await cancelBooking(booking.id);
      setBookings((prevBookings) => 
        prevBookings.filter((b) => b.id !== booking.id)
      );
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-primary" />
            <DialogTitle>{booking.lab}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <CalendarDays className="h-5 w-5 text-gray-500" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{booking.time}</span>
          </div>
          {booking.issue && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Issue</h4>
              <p className="text-sm text-gray-600">{booking.issue}</p>
            </div>
          )}
          {booking.description && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-gray-600">{booking.description}</p>
            </div>
          )}
          <div className="border-t pt-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancelBooking}
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};