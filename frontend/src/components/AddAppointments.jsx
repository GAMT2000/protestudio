import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function AddAppointment() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    client_id: "",
    appointment_date: "",
    appointment_time: "",
    type: "",
    notes: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clients");
        setClients(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredClients = clients.filter((client) =>
    client.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectClient = (client) => {
    setFormData({ ...formData, client_id: client.id });
    setSearchTerm(client.full_name);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/appointments", formData);
      navigate("/appointments");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al crear la cita");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">Agregar Cita</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-xl"
        >
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <label className="block text-sm text-gray-600 mb-1">Cliente</label>
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
                setFormData({ ...formData, client_id: "" });
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Escriba el nombre del cliente"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            />

            {showSuggestions && searchTerm && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto shadow-md">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {client.full_name}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-400">
                    No se encontraron clientes
                  </div>
                )}
              </div>
            )}
          </div>

          <label className="block text-sm text-gray-600 mb-1">Fecha</label>
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Hora</label>
          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          >
            <option value="">Seleccione un tipo</option>
            <option value="Nuevo cliente">Nuevo cliente</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>

          <label className="block text-sm text-gray-600 mb-1">Notas</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <button
            type="submit"
            className="w-full bg-[#1B4F72] text-white py-2 rounded hover:bg-[#163f5c] transition"
          >
            Guardar Cita
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAppointment;
