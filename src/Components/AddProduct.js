import React, { useEffect, useState } from "react";

function AddProduct(props) {
  const [productData, setProductData] = useState({});

  // Fectch to add a product
  useEffect(() => {
    if (Object.keys(productData).length !== 0) {
      fetch("http://localhost:3001/add-product", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(productData),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          props.addProductToList({ ...productData, id: response.insertId });
        });
    }
  }, [productData]);

  return (
    <>
      <form
        className="form-margin"
        onSubmit={(event) => {
          setProductData({
            name: event.target.name.value,
            price: event.target.price.value,
            image: event.target.image.value,
            description: event.target.description.value,
          });
          event.preventDefault();
        }}
      >
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Produit description"
          />
        </div>
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="name">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            placeholder="Nom du fichier contenant l'image"
          />
        </div>
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="name">
            Prix
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Prix"
          />
        </div>
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
          ></textarea>
        </div>
        <div className="form-group text-margin">
          <input type="submit" id="button" />
        </div>
      </form>
    </>
  );
}

export default AddProduct;
