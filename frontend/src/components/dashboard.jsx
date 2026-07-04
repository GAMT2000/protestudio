import Sidebar from "./sidebar";
import Card from "./card";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Panel de Control
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Nuevos Clientes Este Mes" value="8" />
          <Card title="Citas de Hoy" value="3" />
          <Card title="Alertas de Stock Bajo" value="2" />
          <Card title="Pedidos Pendientes" value="5" />
          <Card title="Ingresos del Mes" value="S/. 4,200" />
          <Card title="Total de Clientes Activos" value="34" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
