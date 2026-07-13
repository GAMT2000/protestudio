import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Billing() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsResponse = await axios.get("http://localhost:5000/api/billing");
        setPayments(paymentsResponse.data);

        const summaryResponse = await axios.get("http://localhost:5000/api/billing/summary/monthly");
        setSummary(summaryResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Facturación
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summary.map((row) => (
            <div key={row.month} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-sm mb-2">{row.month}</p>
              <p className="text-3xl font-bold text-[#1B4F72]">S/. {row.total}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#1B4F72] text-white">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Monto</th>
                <th className="px-4 py-3">Método de Pago</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">{payment.full_name}</td>
                  <td className="px-4 py-3">S/. {payment.amount}</td>
                  <td className="px-4 py-3">{payment.payment_method}</td>
                  <td className="px-4 py-3">
                    {new Date(payment.payment_date).toLocaleDateString("es-PE", { timeZone: "UTC" })}
                  </td>
                  <td className="px-4 py-3">{payment.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {payments.length === 0 && (
            <p className="text-gray-500 p-6 text-center">
              No hay pagos registrados todavía.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Billing;