interface NavbarProps {
  total: number;
}

export function Navbar({ total }: NavbarProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            TS
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            TrackStock <span className="text-sm font-normal text-slate-500">| Inventario TI</span>
          </h1>
        </div>
        <span className="text-sm text-slate-500">
          Total equipos: <strong className="text-slate-800">{total}</strong>
        </span>
      </div>
    </header>
  );
}