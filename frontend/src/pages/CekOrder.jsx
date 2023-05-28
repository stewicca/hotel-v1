import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./CekOrder.css";

const CekOrder = () => {
  const [cekOrder, setCekOrder] = useState([]);
  const [namaTamu, setNamaTamu] = useState("");

  const getOrder = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:8000/filtering?guest_name=${namaTamu}`
    );
    setCekOrder(response.data);
  };

  return (
    <Layout>
      <section className="hero is-light is-medium is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Cek Order</h1>
            <form onSubmit={getOrder}>
              <div>
                <input
                  type="text"
                  value={namaTamu}
                  onChange={(e) => setNamaTamu(e.target.value)}
                  placeholder="Nama Tamu"
                />
                <button type="submit" className="ml-2">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="articles">
          <div className="column is-8 is-offset-2">
            <div className="card article">
              {cekOrder.map((data, index) => (
                <div className="card-content" key={index}>
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <p className="title article-title">Detail Pemesanan</p>
                      <p className="subtitle article-subtitle">
                        Nomor Pemesanan : {data.booking_number}
                      </p>
                      <div className="tags has-addons level-item">
                        <span className="tag is-rounded is-danger is-light">
                          @Reddoorz
                        </span>
                        <span className="tag is-rounded">May 10, 202X</span>
                      </div>
                    </div>
                  </div>
                  <div className="content article-body has-text-centered">
                    <p>
                      <strong>Nama Pemesan : </strong>
                      <br />
                      {data.booker_name}
                    </p>
                    <p>
                      <strong>Email Pemesan : </strong>
                      <br />
                      {data.booker_email}
                    </p>
                    <p>
                      <strong>Tanggal Pemesanan : </strong>
                      <br />
                      {data.booking_date}
                    </p>
                    <p>
                      <strong>Tanggal Check In : </strong>
                      <br />
                      {data.check_in_date}
                    </p>
                    <p>
                      <strong>Tanggal Check Out : </strong>
                      <br />
                      {data.check_out_date}
                    </p>
                    <p>
                      <strong>Nama Tamu : </strong>
                      <br />
                      {data.guest_name}
                    </p>
                    <p>
                      <strong>Jumlah Kamar : </strong>
                      <br />
                      {data.total_room}
                    </p>
                    <p>
                      <strong>Id Tipe Kamar : </strong>
                      <br />
                      {data.room_type_id}
                    </p>
                    <p>
                      <strong>Status : </strong>
                      <br />
                      {data.booking_status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CekOrder;
