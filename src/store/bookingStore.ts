import { atom, selector } from 'recoil';
import { supabase } from '@/lib/supabase';

export interface Booking {
  id: number;
  lab: string;
  date: string;
  time: string;
  issue: string;
  description: string;
}

export const bookingsState = atom<Booking[]>({
  key: 'bookingsState',
  default: [],
});

export const bookingsSelector = selector({
  key: 'bookingsSelector',
  get: ({ get }) => {
    const bookings = get(bookingsState);
    return bookings;
  },
});

export const fetchBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const createBooking = async (booking: Omit<Booking, 'id'>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const cancelBooking = async (id: number) => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};