import { useState, useEffect } from "react";
import axios from "axios";

function ClientSearchSelect({ onSelect }) {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const filteredClients = clients.filter((client) =>
    client.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (client) => {
    setSearchTerm(client.full_name);
    setShowSuggestions(false);
    onSelect(client.id);
  };

  return (
    <div className="relative mb-4">
      <label className="block text-sm text-gray-600 mb-1">Cliente</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true);
          onSelect("");
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
            <div className="px-3 py-2 text-gray-400">No se encontraron clientes</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientSearchSelect;