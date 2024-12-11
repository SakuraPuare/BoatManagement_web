export type ShipStatus = "active" | "maintenance" | "inactive"
export type ShipType = "passenger" | "cargo" | "ferry"

export interface Ship {
  id: string
  name: string
  type: ShipType
  capacity: number
  status: ShipStatus
  registrationNumber: string
  buildYear: number
  lastMaintenance: string
  nextMaintenance: string
  currentPort: string
}

export interface ShipTypeDetail {
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