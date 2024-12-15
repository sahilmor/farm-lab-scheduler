import { BookingForm } from "@/components/BookingForm";

const Book = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Book a Laboratory
      </h1>
      <BookingForm />
    </div>
  );
};

export default Book;