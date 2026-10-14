export type EngineCondition = 'New OEM Crate' | 'Reconditioned / Refurbished' | 'Tested Low-Mileage Used';

export type FuelType = 'Petrol / Gasoline' | 'Diesel' | 'Hybrid / Turbo-Petrol';

export interface EngineItem {
  id: string;
  name: string;
  manufacturer: string;
  engineCode: string;
  vehicleCompatibility: string;
  modelYears: string;
  displacement: string;
  configuration: string;
  fuelType: FuelType;
  condition: EngineCondition;
  powerOutputGuide?: string;
  compressionRatio?: string;
  aspiration: string;
  guidePrice?: string;
  isPopular?: boolean;
  imageUrl: string;
  specsSummary: string;
  originHub: string;
}

export interface EngineEnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  engineCode?: string;
  displacement?: string;
  fuelType?: string;
  condition: string;
  shippingDestination: string;
  message: string;
  fileName?: string;
}
