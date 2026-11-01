export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: number;
  productionDate: string;
  averageFuelConsumption: number;
  bodyType: number;
}

// omit tworzy nowy typ, który zawiera wszystkie właściwości typu Car z wyjątkiem id
export type NewCar = Omit<Car, 'id'>;