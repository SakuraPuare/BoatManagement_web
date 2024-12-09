import api from '../api.client';
import { endpoints } from '../endpoints';
import type { Boat, CreateBoatDTO, UpdateBoatDTO, BoatType } from '../types/boat';

export const boatService = {
  async getBoats(): Promise<Boat[]> {
    const { data } = await api.get<Boat[]>(endpoints.boats.base);
    return data;
  },

  async getBoatById(id: string): Promise<Boat> {
    const { data } = await api.get<Boat>(endpoints.boats.byId(id));
    return data;
  },

  async createBoat(boat: CreateBoatDTO): Promise<Boat> {
    const { data } = await api.post<Boat>(endpoints.boats.base, boat);
    return data;
  },

  async updateBoat(id: string, boat: UpdateBoatDTO): Promise<Boat> {
    const { data } = await api.put<Boat>(endpoints.boats.byId(id), boat);
    return data;
  },

  async deleteBoat(id: string): Promise<void> {
    await api.delete(endpoints.boats.byId(id));
  },

  async getBoatTypes(): Promise<BoatType[]> {
    const { data } = await api.get<BoatType[]>(endpoints.boatTypes.base);
    return data;
  },
};