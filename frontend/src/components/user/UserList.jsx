import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:8000/user");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/user/${id}`);
    getUser();
  };
  return (
    <div>
      <h1 className="title">User</h1>
      <Link to={"/user/add"} className="button mb-2">
        Add
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Foto</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.user_id}>
              <td>{index + 1}</td>
              <td>
                <img className="image is-96x96" src={user.image} alt="User" />
              </td>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/user/edit/${user.user_id}`}
                  className="button is-small mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.user_id)}
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

export default UserList;
