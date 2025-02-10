export type DeviceStatus = "online" | "offline" | "maintenance" | "fault";
export type DeviceType =
    | "gps"
    | "sensor"
    | "camera"
    | "radar"
    | "communication";

export interface Device {
    id: string;
    name: string;
    type: DeviceType;
    model: string;
    serialNumber: string;
    status: DeviceStatus;
    shipId?: string;
    shipName?: string;
    location?: string;
    installationDate: string;
    lastMaintenance: string;
    nextMaintenance: string;
    manufacturer: string;
    specifications: {
        [key: string]: string | number;
    };
    lastPing?: string;
    batteryLevel?: number;
    signalStrength?: number;
    faultCode?: string;
    faultDescription?: string;
    createdAt: string;
    updatedAt: string;
}

export interface MaintenanceRecord {
    id: string;
    deviceId: string;
    date: string;
    type: "routine" | "repair" | "replacement";
    description: string;
    technician: string;
    cost: number;
    parts?: string[];
}
