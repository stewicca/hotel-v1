import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const KamarList = () => {
  const [kamars, setKamar] = useState([]);

  useEffect(() => {
    getKamar();
  }, []);

  const getKamar = async () => {
    const response = await axios.get("http://localhost:8000/room");
    setKamar(response.data);
  };

  const deleteKamar = async (id) => {
    await axios.delete(`http://localhost:8000/room/${id}`);
    getKamar();
  };
  return (
    <div>
      <h1 className="title">Kamar</h1>
      <Link to={"/kamar/add"} className="button mb-2">
        Add
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Nomor Kamar</th>
            <th>Id Tipe Kamar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {kamars.map((kamar) => (
            <tr key={kamar.room_id}>
              <td>{kamar.room_number}</td>
              <td>{kamar.room_type_id}</td>
              <td>
                <Link
                  to={`/kamar/edit/${kamar.room_id}`}
                  className="button is-small mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteKamar(kamar.room_id)}
                  className="button is-small is-danger"
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

export default KamarList;
