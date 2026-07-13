import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Supplies() {
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/supplies");
        setSupplies(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSupplies();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Insumos
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#1B4F72] text-white">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Stock Actual</th>
                <th className="px-4 py-3">Stock Mínimo</th>
                <th className="px-4 py-3">Unidad</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => {
                const isLow = supply.current_stock < supply.minimum_stock;

                return (
                  <tr key={supply.id} className="border-b border-gray-100">
                    <td className="px-4 py-3">{supply.name}</td>
                    <td className="px-4 py-3">{supply.current_stock}</td>
                    <td className="px-4 py-3">{supply.minimum_stock}</td>
                    <td className="px-4 py-3">{supply.unit}</td>
                    <td className="px-4 py-3">
                      {isLow ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          Stock bajo
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {supplies.length === 0 && (
            <p className="text-gray-500 p-6 text-center">
              No hay insumos registrados todavía.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Supplies;