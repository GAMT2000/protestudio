import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Appointments from "./components/Appointments";
import Clients from "./components/Clients";
import Orders from "./components/Orders";
import Supplies from "./components/Supplies";
import Billing from "./components/Billing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/supplies" element={<Supplies />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
