export type BoatStatus = "active" | "maintenance" | "inactive"
export type BoatType = "passenger" | "cargo" | "ferry"

export interface Boat {
  id: string
  name: string
  type: BoatType
  capacity: number
  status: BoatStatus
  registrationNumber: string
  buildYear: number
  lastMaintenance: string
  nextMaintenance: string
  currentPort: string
}

export interface BoatTypeDetail {
  id: string
  name: string
  code: string
  description: string
  maxCapacity: number
  maxSpeed: number
  fuelType: string
  createdAt: string
  updatedAt: string
  isActive: boolean
} 