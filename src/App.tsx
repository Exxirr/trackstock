import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import type { Equipment } from './types/equipment';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { EquipmentTable } from './components/EquipmentTable';
import { EquipmentModal } from './components/EquipmentModal';

export function App() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  const equipmentsCollectionRef = collection(db, "equipments");

  const getEquipments = async () => {
    try {
      const data = await getDocs(equipmentsCollectionRef);
      setEquipments(data.docs.map((documento) => ({ ...documento.data(), id: documento.id })) as Equipment[]);
    } catch (error) {
      console.error("Error al obtener los equipos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEquipments();
  }, []);

  const handleSaveEquipment = async (equipmentData: any) => {
    if (editingEquipment) {
      const equipmentDocRef = doc(db, "equipments", editingEquipment.id);
      await updateDoc(equipmentDocRef, equipmentData);
    } else {
      await addDoc(equipmentsCollectionRef, equipmentData);
    }
    await getEquipments();
  };

  const handleDeleteEquipment = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este equipo?")) return;

    try {
      const equipmentDocRef = doc(db, "equipments", id);
      await deleteDoc(equipmentDocRef);
      await getEquipments();
    } catch (error) {
      console.error("Error al eliminar el equipo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">
      <Navbar total={equipments.length} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <button
            onClick={() => { setEditingEquipment(null); setIsModalOpen(true); }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            + Nuevo Equipo
          </button>
        </div>

        <EquipmentTable 
          equipments={equipments}
          loading={loading}
          searchTerm={searchTerm}
          onEdit={(item) => { setEditingEquipment(item); setIsModalOpen(true); }}
          onDelete={handleDeleteEquipment}
        />
      </main>

      <EquipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEquipment}
        equipmentToEdit={editingEquipment}
      />
    </div>
  );
}

export default App;