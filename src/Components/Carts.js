import React, { useEffect, useState } from "react";
import Product from "./Product";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Carts(props) {
  const [products, setProducts] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
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
        let priceTotal = products
          .map((produit) => {
            return {
              ...produit,
              quantity: res[produit.id] === undefined ? 0 : res[produit.id],
            };
          })
          .reduce(
            (priceTotal, produit) =>
              priceTotal + produit.price * produit.quantity,
            0
          );
        setPriceTotal(priceTotal);
      });
  }, [products]);

  //Save basket
  useEffect(() => {
    if (isOrder) {
      fetch("http://localhost:3001/save-order", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(navigate("/Ordered"));
    }
  }, [isOrder]);

  return (
    <>
      <NavBar
        isAdmin={props.isAdmin}
        setNbItem={props.setNbItem}
        nbItem={props.nbItem}
        isCartDisplay={false}
      />
      <div className="row">
        <div className="col align-self-center total-purchase purchase">
          Total des achats: {priceTotal} €
        </div>
        <div className="col align-self-center button-order purchase">
          <button
            type="button"
            className="btn btn-success btn-lg button-margin"
            onClick={() => {
              props.setNbItem(0);
              setIsOrder(!isOrder);
            }}
          >
            Passer la commande
          </button>
        </div>
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
