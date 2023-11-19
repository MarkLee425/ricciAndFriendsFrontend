import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function ItemPage() {
  const params = useParams();
  const [data, setData] = useState([]);
  const API_URL = `http://localhost:8080/cargo/info?id=${params.itemId}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: "thisIsSecure",
            "Access-Control-Allow-Origin": "*",
          }
        });
        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="header">
        <nav>
          <button className="logo-button">
            <img src="/cathay.jpg" width="70" alt="Cathay Pacific Logo" />
            <h1 className="logo-text">Cathay Pacific Cargo</h1>
          </button>
          <button className="user-button">
            <FaRegUserCircle size={30} className="user-icon" />
          </button>
        </nav>
      </div>

      <div className="container">
        <div className="item-details">
          <img src={"/bottle.jpeg"} width="300" alt={`Item 0`} className="item-image" />
          <div className="item-info">
            <h2>Item ID: {data[0]}</h2>
            <p>Dimension: ({data[3]}, {data[4]}, {data[5]})</p>
            <p>Price: {data[6]}</p>
          </div>
        </div>
      </div>
    </>
  );
}