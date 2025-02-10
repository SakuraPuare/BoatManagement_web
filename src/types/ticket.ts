export type TicketStatus =
    | "available"
    | "sold"
    | "used"
    | "cancelled"
    | "expired";

export interface Ticket {
    id: string;
    shipId: string;
    shipName: string;
    routeId: string;
    routeName: string;
    departurePort: string;
    arrivalPort: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    seatNumber: string;
    status: TicketStatus;
    passengerName?: string;
    passengerPhone?: string;
    passengerIdCard?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TicketRoute {
    id: string;
    name: string;
    departurePort: string;
    arrivalPort: string;
    distance: number;
    duration: number;
    basePrice: number;
}
