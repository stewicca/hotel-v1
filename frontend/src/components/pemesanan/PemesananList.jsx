import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PemesananList = () => {
  const [pemesanans, setPemesanan] = useState([]);

  useEffect(() => {
    getPemesanan();
  }, []);

  const getPemesanan = async () => {
    const response = await axios.get("http://localhost:8000/booking");
    setPemesanan(response.data);
  };

  const deletePemesanan = async (id) => {
    await axios.delete(`http://localhost:8000/booking/${id}`);
    getPemesanan();
  };
  return (
    <div>
      <h1 className="title">Pemesanan</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Tanggal</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Tamu</th>
            <th>Total Kamar</th>
            <th>Tipe Kamar</th>
            <th>Status Pemesanan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pemesanans.map((pemesanan) => (
            <tr key={pemesanan.booking_id}>
              <td>{pemesanan.booking_number}</td>
              <td>{pemesanan.booker_name}</td>
              <td>{pemesanan.booker_email}</td>
              <td>{pemesanan.booking_date}</td>
              <td>{pemesanan.check_in_date}</td>
              <td>{pemesanan.check_out_date}</td>
              <td>{pemesanan.guest_name}</td>
              <td>{pemesanan.total_room}</td>
              <td>{pemesanan.room_type_id}</td>
              <td>{pemesanan.booking_status}</td>
              <td>
                <Link
                  to={`/pemesanan/edit/${pemesanan.booking_id}`}
                  className="button is-small"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePemesanan(pemesanan.booking_id)}
                  className="button is-small is-danger mt-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PemesananList;
