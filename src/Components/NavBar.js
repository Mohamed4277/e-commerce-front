import React, { useState, useEffect } from "react";
import { Cart2, Power } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
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
  /*useEffect(() => {
    fetch("http://localhost:3001/save-order", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  }, [isOrder]);*/

  const isAccessStorage = sessionStorage.getItem("isAccess");

  return (
    <>
      <div className="row nav-bar-style">
        {isAccessStorage && (
          <div className="col nav-bar-power">
            <button
              className="btn btn-lg button-margin"
              onClick={() => {
                sessionStorage.setItem("isAccess", false);
                sessionStorage.setItem("isAdmin", false);
                navigate("/");
              }}
            >
              <Power size={30} />
            </button>
          </div>
        )}
        <div className="col nav-bar-cart">
          {props.isAdmin === false && props.isCartDisplay === true && (
            <button
              className="btn btn-lg btn-primary button-margin"
              onClick={() => {
                navigate("/Cart");
                setClickOnCart(!clickOnCart);
              }}
            >
              <div className="d-inline">{props.nbItem}</div>
              <Cart2 size={30} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
