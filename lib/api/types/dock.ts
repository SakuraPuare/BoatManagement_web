export interface Dock {
  dock_id: number;
  dock_name: string;
  dock_location: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateDockDTO {
  dock_name: string;
  dock_location: string;
}

export interface UpdateDockDTO extends Partial<CreateDockDTO> {}