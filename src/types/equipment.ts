export type EquipmentStatus = 'Disponible' | 'Asignado' | 'En Mantenimiento' | 'Baja';

export interface Employee {
  id: string;
  name: string;
  department: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  status: EquipmentStatus;
  assignedTo: Employee | null;
}