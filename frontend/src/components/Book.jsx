import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [emailPemesan, setEmailPemesan] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [namaTamu, setNamaTamu] = useState("");
  const [totalKamar, setTotalKamar] = useState("");
  const [idTipeKamar, setIdTipeKamar] = useState("");
  const [namaTipeKamar, setNamaTipeKamar] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkIn = localStorage.getItem("check_in_date");
    const checkOut = localStorage.getItem("check_out_date");
    const roomTypeId = localStorage.getItem("room_type_id");
    const roomTypeName = localStorage.getItem("room_type_name");

    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setIdTipeKamar(roomTypeId);
    setNamaTipeKamar(roomTypeName);
  }, []);

  const savePemesanan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/booking",
        {
          booker_name: namaPemesan,
          booker_email: emailPemesan,
          check_in_date: checkIn,
          check_out_date: checkOut,
          guest_name: namaTamu,
          total_room: totalKamar,
          room_type_id: idTipeKamar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <div
        className="container box p-6
				has-background-light"
      >
        <h1 className="title has-text-centered">Pesan Kamar</h1>
        <form onSubmit={savePemesanan} encType="application/json">
          <p className="has-text-centered">{msg}</p>
          <div className="field">
            <label className="label">Nama Pemesan</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={namaPemesan}
                onChange={(e) => setNamaPemesan(e.target.value)}
                placeholder="Masukkan Nama"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div
              className="control has-icons-left
					has-icons-right"
            >
              <input
                className="input is-danger"
                type="email"
                value={emailPemesan}
                onChange={(e) => setEmailPemesan(e.target.value)}
                placeholder="Masukkan Email"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Nama Tamu</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={namaTamu}
                onChange={(e) => setNamaTamu(e.target.value)}
                placeholder="Masukkan Nama Tamu"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Tipe Kamar</label>
            <div className="control">
              <input
                className="input is-danger"
                type="text"
                value={namaTipeKamar.replace(/["]/g, "")}
                placeholder="Masukkan Total Kamar"
                readOnly
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Total Kamar</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={totalKamar}
                onChange={(e) => setTotalKamar(e.target.value)}
                placeholder="Masukkan Total Kamar"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" />I agree to the
                <a href="/">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button">
                Pesan
              </button>
            </div>
            <div className="control">
              <a className="button is-danger is-light" href="/">
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
