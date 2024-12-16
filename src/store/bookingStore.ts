import { atom, selector } from 'recoil';
import { supabase } from '@/lib/supabase';

export interface BookingSlot {
  id: number;
  lab: string;
  date: string;
  time: string;
  issue: string;
  description: string;
}

export const bookingSlotsState = atom<BookingSlot[]>({
  key: 'bookingSlotsState',
  default: [],
});

export const bookingSlotsSelector = selector({
  key: 'bookingSlotsSelector',
  get: ({ get }) => {
    const slots = get(bookingSlotsState);
    return slots;
  },
});

export const fetchBookingSlots = async () => {
  const { data, error } = await supabase
    .from('booking-slots')
    .select('*');

  if (error) throw error;
  return data;
};

export const createBookingSlot = async (slot: {
  lab: string;
  date: string;
  time: string;
  issue: string;
  description: string;
}) => {
  const { data, error } = await supabase
    .from("booking-slots") // Match Supabase table name
    .insert([slot])
    .select()
    .single(); // Retrieve the inserted row

  if (error) throw new Error(error.message);
  return data; // Return the newly created booking
};

export const cancelBookingSlot = async (id: number) => {
  const { error } = await supabase
    .from('booking-slots')
    .delete()
    .eq('id', id);

  if (error) throw error;
};