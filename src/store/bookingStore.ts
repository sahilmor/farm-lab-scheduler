import { atom, selector } from 'recoil';

export interface Booking {
  id: number;
  lab: string;
  date: string;
  time: string;
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