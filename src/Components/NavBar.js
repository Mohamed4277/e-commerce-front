import React, { useState, useEffect } from "react";
import { Cart2, Power } from "react-bootstrap-icons";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [nbItem, setItem] = useState(0);
  const [products, setProducts] = useState([]);
  const [isOrder, setIsOrder] = useState(false);
  const [clickOnCart, setClickOnCart] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const url = "http://localhost:3001/display-cart";

    const fetchData = async () => {
      try {
        const response = await fetch(url, { credentials: "same-origin" });
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [clickOnCart]);

  //Save basket
  useEffect(() => {
    fetch("http://localhost:3001/save-order", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  }, [isOrder]);

  return (
    <>
      <nav className="navbar navbar-expand-lg nav-bar-padding navbar-light bg-light">
        <div className="container-fluid nav-bar-height">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <Power size={30} />
                </a>
              </li>
            </ul>
            <div>
              <button
                className="btn btn-lg btn-primary button-margin"
                onClick={() => {
                  setClickOnCart(!clickOnCart);
                }}
              >
                <div className="d-inline">{nbItem}</div>
                <Cart2 size={30} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        {clickOnCart && (
          <button
            type="button"
            className="btn btn btn-danger btn-lg button-margin"
            onClick={() => {
              console.log("lllmlolmplo");
              setIsOrder(!isOrder);
              navigate("/Products");
              setClickOnCart(false);
            }}
          >
            Passer la commande
          </button>
        )}
        {clickOnCart &&
          products.map((livre) => (
            <Product {...livre} isAdmin={false} clickOnCart={clickOnCart} />
          ))}
      </div>
    </>
  );
}

export default NavBar;
