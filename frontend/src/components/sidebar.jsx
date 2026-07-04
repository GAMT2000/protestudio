import { Link } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Panel de Control", path: "/dashboard" },
    { name: "Citas", path: "/appointments" },
    { name: "Clientes", path: "/clients" },
    { name: "Pedidos", path: "/orders" },
    { name: "Insumos", path: "/supplies" },
    { name: "Facturación", path: "/billing" },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#1B4F72] text-white p-6">
      <h2 className="text-xl font-bold mb-8">Protestudio</h2>
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="px-3 py-2 rounded hover:bg-[#163f5c] transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
