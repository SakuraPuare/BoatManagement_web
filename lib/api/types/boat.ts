export interface Boat {
  boat_id: number;
  boat_name: string;
  boat_type_id: number;
  status: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface BoatType {
  boat_type_id: number;
  boat_type_name: string;
  boat_type_description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBoatDTO {
  boat_name: string;
  boat_type_id: number;
}

export interface UpdateBoatDTO extends Partial<CreateBoatDTO> {
  status?: number;
}