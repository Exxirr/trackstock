interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Buscar por equipo, número de serie o empleado..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-96 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}