import React, { useEffect, useState } from "react";
import Product from "./Product";
import AddProduct from "./AddProduct";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Carts(props) {
  const [products, setProducts] = useState([]);
  const [basket, setBaskets] = useState({});
  const [isOrder, setIsOrder] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const url = "http://localhost:3001/get-products";

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
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/get-nb-product")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setBaskets(res);
      });
  }, []);

  function addProductToList(productToAdd) {
    setProducts([productToAdd, ...products]);
  }

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
      <NavBar
        isAdmin={props.isAdmin}
        setNbItem={props.setNbItem}
        nbItem={props.nbItem}
      />
      <div className="button-order">
        <button
          type="button"
          className="btn btn-success btn-lg button-margin"
          onClick={() => {
            props.setNbItem(0);
            setIsOrder(true);
            navigate("/Ordered");
          }}
        >
          Passer la commande
        </button>
      </div>
      {products.map((livre) => {
        return (
          Object.keys(basket).includes(livre.id.toString()) && (
            <Product
              {...livre}
              nbOfProduct={basket[livre.id]}
              clickOnCart={true}
              nbItemInbasket={basket[livre.id]}
              isAdmin={props.isAdmin}
              isInCart={props.isInCart}
              setNbItem={props.setNbItem}
              nbItem={props.nbItem}
            />
          )
        );
      })}
    </>
  );
}

export default Carts;
