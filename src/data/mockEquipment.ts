import type { Equipment } from '../types/equipment';
import  { INITIAL_EMPLOYEES } from '../data/mockEmployee';

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: '1',
    name: 'Laptop Dell Latitude 5420',
    serialNumber: 'SN-882910',
    category: 'Laptops',
    assignedTo: INITIAL_EMPLOYEES[0], // Carlos Mendoza
    status: 'Asignado',
  },
  {
    id: '2',
    name: 'Monitor LG UltraGear 27"',
    serialNumber: 'SN-441029',
    category: 'Monitores',
    assignedTo: null, // Disponible
    status: 'Disponible',
  },
  {
    id: '3',
    name: 'Teclado Mecánico Keychron K2',
    serialNumber: 'SN-119283',
    category: 'Periféricos',
    assignedTo: INITIAL_EMPLOYEES[1], // Ana Lucía Torres
    status: 'Asignado',
  },
  {
    id: '4',
    name: 'Laptop MacBook Pro 14"',
    serialNumber: 'SN-773821',
    category: 'Laptops',
    assignedTo: null,
    status: 'En Mantenimiento',
  },
  {
    id: '5',
    name: 'Mouse Logitech MX Master 3S',
    serialNumber: 'SN-550192',
    category: 'Periféricos',
    assignedTo: null,
    status: 'Baja',
  },
];