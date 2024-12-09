import api from '../api.client';
import { endpoints } from '../endpoints';
import type { Ticket, CreateTicketDTO } from '../types/ticket';

export const ticketService = {
  async getTickets(): Promise<Ticket[]> {
    const { data } = await api.get<Ticket[]>(endpoints.tickets.base);
    return data;
  },

  async getTicketById(id: string): Promise<Ticket> {
    const { data } = await api.get<Ticket>(endpoints.tickets.byId(id));
    return data;
  },

  async createTicket(ticket: CreateTicketDTO): Promise<Ticket> {
    const { data } = await api.post<Ticket>(endpoints.tickets.base, ticket);
    return data;
  },

  async deleteTicket(id: string): Promise<void> {
    await api.delete(endpoints.tickets.byId(id));
  },
};