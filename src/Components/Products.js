import React, { useEffect, useState } from "react";
import Product from "./Product";
import AddProduct from "./AddProduct";

function Products(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const url = "http://localhost:3001/get-products";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
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

  /*function updateProductFromList(IdproductToRemove) {}*/

  function addProductToList(productToAdd) {
    setProducts([productToAdd, ...products]);
  }

  return (
    <>
      {props.isAdmin && (
        <AddProduct
          addProductToList={(productToAdd) => addProductToList(productToAdd)}
        />
      )}

      {products.map((livre) => (
        <Product
          {...livre}
          isAdmin={props.isAdmin}
          removeProductFromList={(IdproductToRemove) =>
            removeProductFromList(IdproductToRemove)
          }
          /* updateProductsList={(productToRemove) =>
            removeProductFromList(productToRemove)
          }*/
        />
      ))}
    </>
  );
}

export default Products;
