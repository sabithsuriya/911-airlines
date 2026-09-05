export interface Flight {
  id: string;
  flightNumber: string;
  fromCode: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopCity?: string;
  aircraft: string;
  priceEconomy: number;
  priceBusiness: number;
  priceFirst: number;
  availableSeats: number;
}

export interface BookingDetails {
  pnr: string;
  passengerName: string;
  email: string;
  phone: string;
  flightOutbound: Flight;
  flightReturn?: Flight;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
  seats: string[];
  totalPrice: number;
  status: 'Confirmed' | 'Checked In' | 'Cancelled';
  gate: string;
  terminal: string;
}

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'fl-101',
    flightNumber: '911-701',
    fromCode: 'DAC',
    toCode: 'SYD',
    departureTime: '02:30',
    arrivalTime: '19:45',
    duration: '13h 15m',
    stops: 1,
    stopCity: 'Singapore (SIN)',
    aircraft: 'Boeing 787-9 Dreamliner',
    priceEconomy: 850,
    priceBusiness: 2450,
    priceFirst: 4800,
    availableSeats: 24
  },
  {
    id: 'fl-102',
    flightNumber: '911-703',
    fromCode: 'DAC',
    toCode: 'SYD',
    departureTime: '10:15',
    arrivalTime: '06:30',
    duration: '16h 15m',
    stops: 1,
    stopCity: 'Bangkok (BKK)',
    aircraft: 'Airbus A350-900',
    priceEconomy: 780,
    priceBusiness: 2200,
    priceFirst: 4200,
    availableSeats: 12
  },
  {
    id: 'fl-103',
    flightNumber: '911-881',
    fromCode: 'SYD',
    toCode: 'DAC',
    departureTime: '11:20',
    arrivalTime: '21:10',
    duration: '13h 50m',
    stops: 1,
    stopCity: 'Kuala Lumpur (KUL)',
    aircraft: 'Boeing 787-9 Dreamliner',
    priceEconomy: 890,
    priceBusiness: 2500,
    priceFirst: 4900,
    availableSeats: 18
  },
  {
    id: 'fl-104',
    flightNumber: '911-204',
    fromCode: 'DAC',
    toCode: 'LHR',
    departureTime: '09:45',
    arrivalTime: '16:20',
    duration: '11h 35m',
    stops: 0,
    aircraft: 'Boeing 777-300ER',
    priceEconomy: 920,
    priceBusiness: 2800,
    priceFirst: 5500,
    availableSeats: 8
  },
  {
    id: 'fl-105',
    flightNumber: '911-505',
    fromCode: 'JFK',
    toCode: 'LHR',
    departureTime: '19:30',
    arrivalTime: '07:45',
    duration: '7h 15m',
    stops: 0,
    aircraft: 'Airbus A350-1000',
    priceEconomy: 650,
    priceBusiness: 1950,
    priceFirst: 3900,
    availableSeats: 30
  },
  {
    id: 'fl-106',
    flightNumber: '911-901',
    fromCode: 'DXB',
    toCode: 'SYD',
    departureTime: '21:15',
    arrivalTime: '17:30',
    duration: '14h 15m',
    stops: 0,
    aircraft: 'Boeing 787-9 Dreamliner',
    priceEconomy: 1100,
    priceBusiness: 3200,
    priceFirst: 6200,
    availableSeats: 15
  }
];

export const INITIAL_MOCK_BOOKINGS: Record<string, BookingDetails> = {
  '911-88992': {
    pnr: '911-88992',
    passengerName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 555 019 2831',
    flightOutbound: MOCK_FLIGHTS[0],
    departureDate: '2025-01-09',
    returnDate: '2025-01-15',
    passengers: { adults: 2, children: 1, infants: 0 },
    cabinClass: 'Economy',
    seats: ['14A', '14B', '14C'],
    totalPrice: 2550,
    status: 'Confirmed',
    gate: 'B12',
    terminal: 'Terminal 2'
  }
};
