import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Home } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">FarmLab Booking</div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild className="text-white hover:text-accent">
            <Link to="/" className="flex items-center gap-2">
              <Home size={20} />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-white hover:text-accent">
            <Link to="/book" className="flex items-center gap-2">
              <CalendarDays size={20} />
              Book Lab
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};