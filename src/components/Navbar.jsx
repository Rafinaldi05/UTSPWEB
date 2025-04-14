import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [surat, setSurat] = useState([]);

  const getDataFromAPI = () => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <>
      <div
        className="bg-dark text-white vh-100 p-3 overflow-auto"        
      >
        <h5 className="text-center">Qur'an Web</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">
              <i className="bi bi-house-door"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" data-bs-toggle="collapse" href="#submenu1"
              role="button" aria-expanded="false" aria-controls="submenu1">
              <i className="bi bi-folder"></i> Surat
            </a>
            <div className="collapse show" id="submenu1">
              <ul className="nav flex-column ms-3">
                {surat.map((surah) => (
                  <li key={surah.nomor} className="nav-item">
                    <Link to={`/surat/${surah.nomor}`} className="nav-link text-white">
                      <i className="bi bi-flower3"></i> {surah.nomor}.{" "}
                      {surah.namaLatin}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
            </a>
          </li>
          <li className="nav-item">
            <Link to="/About" className="nav-link text-white">
              <i className="bi bi-person"></i> About
            </Link>
            </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
