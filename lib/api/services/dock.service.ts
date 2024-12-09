import api from '../api.client';
import { endpoints } from '../endpoints';
import type { Dock, CreateDockDTO, UpdateDockDTO } from '../types/dock';

export const dockService = {
  async getDocks(): Promise<Dock[]> {
    const { data } = await api.get<Dock[]>(endpoints.docks.base);
    return data;
  },

  async getDockById(id: string): Promise<Dock> {
    const { data } = await api.get<Dock>(endpoints.docks.byId(id));
    return data;
  },

  async createDock(dock: CreateDockDTO): Promise<Dock> {
    const { data } = await api.post<Dock>(endpoints.docks.base, dock);
    return data;
  },

  async updateDock(id: string, dock: UpdateDockDTO): Promise<Dock> {
    const { data } = await api.put<Dock>(endpoints.docks.byId(id), dock);
    return data;
  },

  async deleteDock(id: string): Promise<void> {
    await api.delete(endpoints.docks.byId(id));
  },
};