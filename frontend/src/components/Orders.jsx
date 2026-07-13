import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Pedidos
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#1B4F72] text-white">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Proveedor</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Fecha de Pedido</th>
                <th className="px-4 py-3">Entrega Esperada</th>
                <th className="px-4 py-3">Costo</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">{order.full_name}</td>
                  <td className="px-4 py-3">{order.supplier}</td>
                  <td className="px-4 py-3">{order.item_description}</td>
                  <td className="px-4 py-3">
                    {new Date(order.order_date).toLocaleDateString("es-PE", { timeZone: "UTC" })}
                  </td>
                  <td className="px-4 py-3">
                    {order.expected_delivery
                      ? new Date(order.expected_delivery).toLocaleDateString("es-PE", { timeZone: "UTC" })
                      : "-"}
                  </td>
                  <td className="px-4 py-3">S/. {order.cost}</td>
                  <td className="px-4 py-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="text-gray-500 p-6 text-center">
              No hay pedidos registrados todavía.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;