import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch(err) {
      console.error(err);
      setError("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-[#1B4F72] mb-6 text-center">
          Protestudio
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-[#C9A84C]"
        />

        <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:ring-2 focus:ring-[#C9A84C]"
        />

        <button
          type="submit"
          className="w-full bg-[#1B4F72] text-white py-2 rounded hover:bg-[#163f5c] transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
