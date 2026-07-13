import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Card from "./Card";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/summary");
        setSummary(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Panel de Control
        </h1>

        {summary ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Nuevos Clientes Este Mes" value={summary.newClients} />
            <Card title="Citas de Hoy" value={summary.appointmentsToday} />
            <Card title="Alertas de Stock Bajo" value={summary.lowStock} />
            <Card title="Pedidos Pendientes" value={summary.pendingOrders} />
            <Card title="Ingresos del Mes" value={`S/. ${summary.monthlyIncome}`} />
            <Card title="Total de Clientes Activos" value={summary.totalClients} />
          </div>
        ) : (
          <p className="text-gray-500">Cargando datos...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;