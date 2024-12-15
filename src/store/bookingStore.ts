import { atom, selector } from 'recoil';

export interface Booking {
  id: number;
  lab: string;
  date: string;
  time: string;
}

export const bookingsState = atom<Booking[]>({
  key: 'bookingsState',
  default: [
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
  ],
});

export const bookingsSelector = selector({
  key: 'bookingsSelector',
  get: ({ get }) => {
    const bookings = get(bookingsState);
    return bookings;
  },
});