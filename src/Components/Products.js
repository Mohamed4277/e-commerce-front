import React, { useEffect, useState } from "react";
import Product from "./Product";
import AddProduct from "./AddProduct";
import NavBar from "./NavBar";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [basket, setBaskets] = useState({});
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

  function removeProductFromList(IdproductToRemove) {
    const x = [...products.filter((item) => item.id != IdproductToRemove)];
    setProducts(x);
  }

  function addProductToList(productToAdd) {
    setProducts([productToAdd, ...products]);
  }

  return (
    <>
      <NavBar
        isAdmin={props.isAdmin}
        setNbItem={props.setNbItem}
        nbItem={props.nbItem}
        isCartDisplay={true}
      />
      {props.isAdmin && (
        <AddProduct
          addProductToList={(productToAdd) => addProductToList(productToAdd)}
        />
      )}

      {products.map((livre) => (
        <Product
          {...livre}
          nbItemInbasket={basket[livre.id]}
          isAdmin={props.isAdmin}
          removeProductFromList={(IdproductToRemove) =>
            removeProductFromList(IdproductToRemove)
          }
          isInCart={props.isInCart}
          setNbItem={props.setNbItem}
          nbItem={props.nbItem}
        />
      ))}
    </>
  );
}

export default Products;
