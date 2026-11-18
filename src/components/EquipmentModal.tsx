import { useState, useEffect } from 'react';
import type { Equipment, EquipmentStatus } from '../types/equipment';
import { INITIAL_EMPLOYEES } from '../data/mockEmployee';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipmentData: {
    name: string;
    serialNumber: string;
    category: string;
    status: EquipmentStatus;
    assignedTo: any;
  }) => Promise<void>;
  equipmentToEdit?: Equipment | null;
}

export function EquipmentModal({ isOpen, onClose, onSave, equipmentToEdit }: EquipmentModalProps) {
  // Un solo estado unificado en lugar de 5 estados sueltos
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    category: 'Laptops',
    status: 'Disponible' as EquipmentStatus,
    employeeId: ''
  });

  const [submitting, setSubmitting] = useState(false);

  // Sincronizar los datos cuando se abre para editar o crear
  useEffect(() => {
    if (equipmentToEdit) {
      setFormData({
        name: equipmentToEdit.name,
        serialNumber: equipmentToEdit.serialNumber,
        category: equipmentToEdit.category,
        status: equipmentToEdit.status,
        employeeId: equipmentToEdit.assignedTo ? equipmentToEdit.assignedTo.id : ''
      });
    } else {
      setFormData({
        name: '',
        serialNumber: '',
        category: 'Laptops',
        status: 'Disponible',
        employeeId: ''
      });
    }
  }, [equipmentToEdit, isOpen]);

  if (!isOpen) return null;

  // Función genérica para manejar cualquier cambio en los inputs o selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.serialNumber.trim()) return;

    const selectedEmployee = INITIAL_EMPLOYEES.find(emp => emp.id === formData.employeeId) || null;

    setSubmitting(true);
    try {
      await onSave({
        name: formData.name,
        serialNumber: formData.serialNumber,
        category: formData.category,
        status: formData.status,
        assignedTo: formData.status === 'Asignado' ? selectedEmployee : null,
      });
      onClose();
    } catch (error) {
      console.error("Error al guardar en el modal:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">
            {equipmentToEdit ? 'Editar Equipo' : 'Registrar Nuevo Equipo'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nombre del Equipo</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ej: Monitor Dell 24 pulgadas"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Número de Serie</label>
            <input
              type="text"
              name="serialNumber"
              required
              placeholder="Ej: SN-998822"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Laptops">Laptops</option>
                <option value="Monitores">Monitores</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Redes">Redes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Disponible">Disponible</option>
                <option value="Asignado">Asignado</option>
                <option value="En Mantenimiento">En Mantenimiento</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          {formData.status === 'Asignado' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Asignar a Empleado</label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">-- Seleccione un empleado --</option>
                {INITIAL_EMPLOYEES.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.department})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : equipmentToEdit ? 'Actualizar Equipo' : 'Guardar Equipo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}