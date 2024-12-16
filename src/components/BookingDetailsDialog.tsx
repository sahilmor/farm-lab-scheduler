import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Clock, TestTube2, Leaf, Droplets } from "lucide-react";
import { Booking } from "@/store/bookingStore";

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
        </div>
      </DialogContent>
    </Dialog>
  );
};