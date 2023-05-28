import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditPemesanan = () => {
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/booking/${id}`,
        {
          booking_status: status,
          user_id: user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pemesanan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:8000/user");
    setDataUser(response.data);
  };

  return (
    <div>
      <h1 className="title">Edit Status Pemesanan</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateStatus} encType="application/json">
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option selected>Pilih Status</option>
                      <option value="check_in">Check In</option>
                      <option value="check_out">Check Out</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Petugas</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    >
                      <option selected>Pilih Petugas</option>
                      {dataUser.map((user, index) => (
                        <option value={user.user_id} key={index}>
                          {`${user.user_id} = ${user.user_name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button">
                    Update
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

export default FormEditPemesanan;
