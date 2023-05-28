import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(
    "https://bulma.io/images/placeholders/96x96.png"
  );
  const [foto, setFoto] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${id}`);
        setNama(response.data.user_name);
        setImage(response.data.image);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setFoto(uploaded);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/user/${id}`,
        {
          user_name: nama,
          image: foto,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/user");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Edit User</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser} encType="multipart/form-data">
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama</label>
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
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option selected>Pilih Role</option>
                      <option value="admin">Admin</option>
                      <option value="receptionist">Resepsionis</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label htmlFor="formFile" className="label">
                  Foto
                </label>
                <img src={image} alt="User Update" className="image is-96x96" />
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

export default FormEditUser;
