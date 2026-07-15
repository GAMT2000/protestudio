import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function AddClient() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    hair_type: "",
    hair_color: "",
    hair_texture: "",
    hair_density: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/clients", formData);
      navigate("/clients");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al crear el cliente");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Agregar Cliente
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-xl"
        >
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <label className="block text-sm text-gray-600 mb-1">Nombre completo</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Tipo de cabello</label>
          <input
            type="text"
            name="hair_type"
            value={formData.hair_type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Color de cabello</label>
          <input
            type="text"
            name="hair_color"
            value={formData.hair_color}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Textura de cabello</label>
          <input
            type="text"
            name="hair_texture"
            value={formData.hair_texture}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Densidad de cabello</label>
          <input
            type="text"
            name="hair_density"
            value={formData.hair_density}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <button
            type="submit"
            className="w-full bg-[#1B4F72] text-white py-2 rounded hover:bg-[#163f5c] transition"
          >
            Guardar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClient;