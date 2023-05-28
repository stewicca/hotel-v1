import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import User from "./pages/user/User";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import TipeKamar from "./pages/tipekamar/TipeKamar";
import AddTipeKamar from "./pages/tipekamar/AddTipeKamar";
import EditTipeKamar from "./pages/tipekamar/EditTipeKamar";
import Kamar from "./pages/kamar/Kamar";
import AddKamar from "./pages/kamar/AddKamar";
import EditKamar from "./pages/kamar/EditKamar";
import Pemesanan from "./pages/pemesanan/Pemesanan";
import EditPemesanan from "./pages/pemesanan/EditPemesanan";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Payment from "./pages/Payment";
import CekOrder from "./pages/CekOrder";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/tipekamar" element={<TipeKamar />} />
          <Route path="/tipekamar/add" element={<AddTipeKamar />} />
          <Route path="/tipekamar/edit/:id" element={<EditTipeKamar />} />
          <Route path="/kamar" element={<Kamar />} />
          <Route path="/kamar/add" element={<AddKamar />} />
          <Route path="/kamar/edit/:id" element={<EditKamar />} />
          <Route path="/pemesanan" element={<Pemesanan />} />
          <Route path="/pemesanan/edit/:id" element={<EditPemesanan />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pembayaran" element={<Payment />} />
          <Route path="/cekorder" element={<CekOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
