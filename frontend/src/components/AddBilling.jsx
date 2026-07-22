import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ClientSearchSelect from "./ClientSearchSelect";

function AddBilling() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    client_id: "",
    amount: "",
    payment_method: "",
    payment_date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/billing", formData);
      navigate("/billing");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al registrar el pago");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-[#F5F0EB] min-h-screen">
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6">
          Registrar Pago
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

          <label className="block text-sm text-gray-600 mb-1">Monto (S/.)</label>
          <input
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Método de pago</label>
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          >
            <option value="">Seleccione un método</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Yape">Yape</option>
            <option value="Plin">Plin</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>

          <label className="block text-sm text-gray-600 mb-1">Fecha de pago</label>
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <label className="block text-sm text-gray-600 mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />

          <button
            type="submit"
            className="w-full bg-[#1B4F72] text-white py-2 rounded hover:bg-[#163f5c] transition"
          >
            Guardar Pago
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBilling;