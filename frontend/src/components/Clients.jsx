import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";

function Clients() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/clients");
                setClients(response.data);
            }   catch(err) {
                console.error(err);
            }
        };

        fetchClients();
    }, []);

    return (
        <div className="flex">
            <Sidebar/>

            <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
                <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
                    Clientes
                </h1>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#1B4F72] text-white">
                            <tr>
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Correo</th>
                                <th className="px-4 py-3">Teléfono</th>
                                <th className="px-4 py-3">Tipo de Cabello</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="border-b border-gray-100">
                                    <td className="px-4 py-3">{client.full_name}</td>
                                    <td className="px-4 py-3">{client.email}</td>
                                    <td className="px-4 py-3">{client.phone || "-"}</td>
                                    <td className="px-4 py-3">{client.hair_type || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {clients.length === 0 && (
                        <p className="text-gray-500 p-6 text-center">
                            No hay clientes registrados todavia
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Clients;