import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments",
        );
        setAppointments(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">Citas</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#1B4F72] text-white">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">{appt.full_name}</td>
                  <td className="px-4 py-3">
                    {new Date(appt.appointment_date).toLocaleDateString(
                      "es-PE",
                      { timeZone: "UTC" },
                    )}
                  </td>
                  <td className="px-4 py-3">{appt.appointment_time}</td>
                  <td className="px-4 py-3">{appt.type}</td>
                  <td className="px-4 py-3">{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {appointments.length === 0 && (
            <p className="text-gray-500 p-6 text-center">
              No hay citas registradas todavia.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
