import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TipeKamarList = () => {
  const [tipeKamar, setTipeKamar] = useState([]);

  useEffect(() => {
    getTipeKamar();
  }, []);

  const getTipeKamar = async () => {
    const response = await axios.get("http://localhost:8000/roomtype");
    setTipeKamar(response.data);
  };

  const deleteTipeKamar = async (id) => {
    await axios.delete(`http://localhost:8000/roomtype/${id}`);
    getTipeKamar();
  };

  return (
    <div>
      <h1 className="title">Tipe Kamar</h1>
      <Link to={"/tipekamar/add"} className="button mb-2">
        Add
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Foto</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tipeKamar.map((tipekamar, index) => (
            <tr key={tipekamar.room_type_id}>
              <td>{index + 1}</td>
              <td>
                <img
                  className="image is-96x96"
                  src={tipekamar.image}
                  alt="Tipe Kamar"
                />
              </td>
              <td>{tipekamar.room_type_name}</td>
              <td>{tipekamar.price}</td>
              <td>{tipekamar.description}</td>
              <td>
                <Link
                  to={`/tipekamar/edit/${tipekamar.room_type_id}`}
                  className="button is-small mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTipeKamar(tipekamar.room_type_id)}
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

export default TipeKamarList;
