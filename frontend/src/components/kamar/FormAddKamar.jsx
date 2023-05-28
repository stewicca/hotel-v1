import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddKamar = () => {
  const [nomorKamar, setNomorKamar] = useState(0);
  const [idTipeKamar, setIdTipeKamar] = useState(0);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveKamar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/room",
        {
          room_number: nomorKamar,
          room_type_id: idTipeKamar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/kamar");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Add Kamar</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveKamar} encType="application/json">
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nomor Kamar</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={nomorKamar}
                    onChange={(e) => setNomorKamar(e.target.value)}
                    placeholder="Nomor Kamar"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Id Tipe Kamar</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={idTipeKamar}
                    onChange={(e) => setIdTipeKamar(e.target.value)}
                    placeholder="Id Tipe Kamar"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddKamar;
