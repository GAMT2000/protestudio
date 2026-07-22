import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ClientSearchSelect from "./ClientSearchSelect";

function AddOrder() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    client_id: "",
    supplier: "",
    item_description: "",
    order_date: "",
    expected_delivery: "",
    cost: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/orders", formData);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al crear el pedido");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Agregar Pedido
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-xl"
        >
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <ClientSearchSelect
            onSelect={(id) => setFormData((previousFormData) => ({ ...previousFormData, client_id: id }))}
          />

          <label className="block text-sm text-gray-600 mb-1">Proveedor</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Descripción del artículo</label>
          <input
            type="text"
            name="item_description"
            value={formData.item_description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Fecha de pedido</label>
          <input
            type="date"
            name="order_date"
            value={formData.order_date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Entrega esperada</label>
          <input
            type="date"
            name="expected_delivery"
            value={formData.expected_delivery}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Costo (S/.)</label>
          <input
            type="number"
            step="0.01"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <button
            type="submit"
            className="w-full bg-[#1B4F72] text-white py-2 rounded hover:bg-[#163f5c] transition"
          >
            Guardar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddOrder;