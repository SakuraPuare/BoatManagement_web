export type DockStatus = "active" | "maintenance" | "full" | "closed"
export type DockType = "passenger" | "cargo" | "mixed"

export interface Dock {
  id: string
  name: string
  code: string
  type: DockType
  status: DockStatus
  location: {
    latitude: number
    longitude: number
    address: string
    city: string
  }
  capacity: {
    maxShips: number
    currentShips: number
    maxPassengers: number
    maxCargo: number // 吨
  }
  facilities: string[]
  contactInfo: {
    manager: string
    phone: string
    email: string
  }
  operatingHours: {
    open: string
    close: string
  }
  weatherCondition?: {
    temperature: number
    windSpeed: number
    visibility: number
    waveHeight: number
    timestamp: string
  }
  maintenanceSchedule?: {
    lastMaintenance: string
    nextMaintenance: string
    description: string
  }
  createdAt: string
  updatedAt: string
}

export interface BerthSchedule {
  id: string
  dockId: string
  shipId: string
  shipName: string
  berthNumber: string
  arrivalTime: string
  departureTime: string
  status: "scheduled" | "arrived" | "departed" | "cancelled"
  cargoOperation?: {
    type: "loading" | "unloading" | "both"
    quantity: number
  }
} 