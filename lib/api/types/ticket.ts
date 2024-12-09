export interface Ticket {
  ticket_id: number;
  user_id: number;
  boat_id: number;
  start_time: string;
  end_time: string;
  departure_dock_id: number;
  destination_dock_id: number;
  price: number;
  remaining_tickets: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTicketDTO {
  boat_id: number;
  start_time: string;
  end_time: string;
  departure_dock_id: number;
  destination_dock_id: number;
  price: number;
  remaining_tickets: number;
}