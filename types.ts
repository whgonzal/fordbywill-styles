export type Vehicle = {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage?: number;
  stockNumber?: string;
  photoUrls: string[];
  createdAt: string;
};
