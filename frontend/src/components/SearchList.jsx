import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchList = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [dataKamar, setDataKamar] = useState([]);
  const [msg, setMsg] = useState("");

  const saveDate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/filtering",
          {
            check_in_date: checkIn,
            check_out_date: checkOut,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => setDataKamar(response.data.room));
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("check_in_date", JSON.stringify(checkIn));
    localStorage.setItem("check_out_date", JSON.stringify(checkOut));
  }, [checkIn, checkOut]);

  return (
    <div>
      <section className="hero">
        <div className="hero-body">
          <div className="control">
            <form
              className="field is-grouped"
              onSubmit={saveDate}
              encType="multipart/form-data"
            >
              <p className="has-text-centered">{msg}</p>
              <p className="control is-expanded">
                <label className="label">Tanggal Check In</label>
                <input
                  className="input"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  style={{ borderStyle: "none" }}
                />
              </p>
              <p className="control is-expanded">
                <label className="label">Tanggal Check Out</label>
                <input
                  className="input"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  style={{ borderStyle: "none" }}
                />
              </p>
              <p className="control">
                <label className="label">Cari</label>
                <button type="submit" className="button is-outlined">
                  Search
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="columns is-centered" style={{ padding: "2rem" }}>
          {dataKamar.map((data, index) => (
            <Link
              className="column is-4"
              key={index}
              to={"/pembayaran"}
              onClick={() => {
                localStorage.setItem(
                  "room_type_id",
                  JSON.stringify(dataKamar[index].room_type_id)
                );
                localStorage.setItem(
                  "room_type_name",
                  JSON.stringify(dataKamar[index].room_type_name)
                );
              }}
            >
              <div className="card mt-4">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={data.image} alt="Tipe Kamar" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <p className="title">{data.room_type_name}</p>
                    <p className="subtitle">{data.description}</p>
                    <p
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      IDR {data.price}
                    </p>
                    <p style={{ textAlign: "right" }}>
                      Tersisa {data.room.length}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchList;
