import type { Equipment, EquipmentStatus } from '../types/equipment';

interface EquipmentTableProps {
  equipments: Equipment[];
  loading: boolean;
  searchTerm: string;
  onEdit: (item: Equipment) => void;
  onDelete: (id: string) => void;
}

export function EquipmentTable({ equipments, loading, searchTerm, onEdit, onDelete }: EquipmentTableProps) {
  const filteredEquipments = equipments.filter((item) => {
    const query = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.serialNumber.toLowerCase().includes(query) ||
      (item.assignedTo && item.assignedTo.name.toLowerCase().includes(query))
    );
  });

  const getStatusBadge = (status: EquipmentStatus) => {
    const styles: Record<EquipmentStatus, string> = {
      Disponible: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Asignado: 'bg-blue-100 text-blue-800 border-blue-200',
      'En Mantenimiento': 'bg-amber-100 text-amber-800 border-amber-200',
      Baja: 'bg-rose-100 text-rose-800 border-rose-200',
    };
    return styles[status];
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
              <th className="py-3.5 px-4">Equipo</th>
              <th className="py-3.5 px-4">Categoría</th>
              <th className="py-3.5 px-4">N° Serie</th>
              <th className="py-3.5 px-4">Responsable</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 animate-pulse">
                  Cargando inventario desde la nube...
                </td>
              </tr>
            ) : filteredEquipments.length > 0 ? (
              filteredEquipments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">{item.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">{item.serialNumber}</td>
                  
                  <td className="py-3.5 px-4 text-slate-600">
                    {item.assignedTo ? (
                      <div>
                        <span className="font-medium text-slate-800">{item.assignedTo.name}</span>
                        <span className="block text-xs text-slate-400">{item.assignedTo.department}</span>
                      </div>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-medium rounded transition-colors border border-sky-200 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-medium rounded transition-colors border border-rose-200 cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No se encontraron equipos registrados o que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}