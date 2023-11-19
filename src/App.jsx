import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BrowserRouter as Router, Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const API_URL = "http://localhost:8080/cargo/info";

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: "thisIsSecure",
            "Access-Control-Allow-Origin": "*",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleButtonClick = (itemId) => {
    // Handle button click event here
    // You can navigate to another page using React Router
    navigate(`/item/${itemId}`);
  };

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
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Dimension (x, y, z)</th>
                <th>Price ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((each) => (
                <tr key={each[0]}>
                  <td>{each[0]}</td>
                  <td>
                    ({each[3]}, {each[4]}, {each[5]})
                  </td>
                  <td>{each[6]}</td>
                  <td>
                    <button
                      onClick={() => handleButtonClick(each[0])}
                      className="action-button"
                    >
                      <span>View</span>
                      <span className="arrow-icon">&#10148;</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
}

export default App;
