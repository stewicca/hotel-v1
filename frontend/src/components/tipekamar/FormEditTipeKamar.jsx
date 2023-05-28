import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditTipeKamar = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState(
    "https://bulma.io/images/placeholders/96x96.png"
  );
  const [foto, setFoto] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTipeKamarById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/roomtype/${id}`
        );
        setNama(response.data.room_type_name);
        setHarga(response.data.price);
        setDeskripsi(response.data.description);
        setImage(response.data.image);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getTipeKamarById();
  }, [id]);

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setFoto(uploaded);
  };

  const updateTipeKamar = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/roomtype/${id}`,
        {
          room_type_name: nama,
          price: harga,
          description: deskripsi,
          image: foto,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/tipekamar");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Edit Tipe Kamar</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateTipeKamar} encType="multipart/form-data">
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Harga"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Deskripsi</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Deskripsi"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="formFile" className="label">
                  Foto
                </label>
                <img
                  src={image}
                  alt="Tipe Kamar Update"
                  className="image is-96x96"
                />
                <br />
                <input
                  type="file"
                  className="form-control"
                  onChange={handleUploadChange}
                  id="formFile"
                  accept="image/*"
                  name="image"
                />
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

export default FormEditTipeKamar;
