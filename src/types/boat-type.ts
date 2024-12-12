export interface BoatType {
  boatTypeId: number
  typeName: string
  typeCode: string
  maxCapacity: number
  maxSpeed: number
  fuelType: string
  status: number
  createdAt?: string
  updatedAt?: string
}

export interface BoatTypeFormData {
  typeName: string
  typeCode: string
  maxCapacity: number
  maxSpeed: number
  fuelType: string
  status: number
} 