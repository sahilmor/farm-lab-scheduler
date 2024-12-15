import { createContext, useContext, useState, ReactNode } from "react";

export interface Booking {
  id: number;
  lab: string;
  date: string;
  time: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id">) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      lab: "Soil Testing Lab",
      date: "2024-03-20",
      time: "10:00 AM",
    },
    {
      id: 2,
      lab: "Plant Pathology Lab",
      date: "2024-03-22",
      time: "2:00 PM",
    },
  ]);

  const addBooking = (booking: Omit<Booking, "id">) => {
    setBookings((prev) => [
      ...prev,
      { ...booking, id: prev.length ? Math.max(...prev.map((b) => b.id)) + 1 : 1 },
    ]);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
};