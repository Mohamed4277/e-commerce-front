import React, { useEffect, useState } from "react";

function Product(props) {
  const { name, description, price, image, id } = props;
  const [basket, setBaskets] = useState({});
  const [idToDelete, setidToDelete] = useState(0);
  const [idToDeleteFromCart, setidToDeleteFromCart] = useState(0);
  const [idToAdd, setidToAdd] = useState(0);
  const [nbOfproduct, setnbOfproduct] = useState(0);
  const [nbOfproductDisplay, setnbOfproductDisplay] = useState(
    props.nbOfProduct
  );
  const [isfirstUpdate, setisfirstUpdate] = useState(0);
  const [productToUpdate, setProductToUpdate] = useState({
    name: props.name,
    description: props.description,
    price: props.price,
    image: props.image,
    id: props.id,
  });

  const isAdminStorage = sessionStorage.getItem("isAdmin");

  //Get Image from folder
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../Images", false, /\.(png|jpe?g|svg)$/)
  );

  //Fetch to delete a product
  useEffect(() => {
    if (idToDelete != 0) {
      fetch("http://localhost:3001/delete-product", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ id: idToDelete }),
      }).then(() => {
        props.removeProductFromList(idToDelete);
      });
    }
  }, [idToDelete]);

  //Fetch to delete a product
  useEffect(() => {
    if (idToAdd != 0) {
      fetch("http://localhost:3001/add-product/" + idToAdd, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ id: idToAdd }),
      });
    }
  }, [idToAdd, nbOfproduct]);

  //Fetch to update a product
  useEffect(() => {
    if (isfirstUpdate != 0) {
      fetch("http://localhost:3001/update-product", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...productToUpdate, id: props.id }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {});
    }
  }, [productToUpdate]);

  //Add a product in basket
  useEffect(() => {
    if (props.id != 0) {
      fetch("http://localhost:3001/update-product/" + props.id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ nbOfProduct: nbOfproductDisplay }),
      });
    }
  }, [nbOfproductDisplay]);

  //Delete a product from basket
  /*useEffect(() => {
    if (props.id != 0) {
      console.log("delete a product");
      fetch("http://localhost:3001/delete-product/" + props.id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ nbOfProduct: 0 }),
      });
    }
  }, [idToDeleteFromCart]);*/

  return (
    <div className="card m-3">
      <div className="row g-0">
        <div className="col-md-2">
          <img
            src={images[props.image]}
            className="img-fluid rounded-start image-margin"
          />
        </div>
        <div className="col-md-10">
          <div className="card-body text-margin">
            <h5 className="card-title">
              <input
                readonly={!props.isAdmin}
                type="text"
                className="col-6 input-without-border"
                id="name"
                name="name"
                value={productToUpdate.name}
                onInput={(event) => {
                  setProductToUpdate({
                    ...productToUpdate,
                    name: event.target.value,
                  });
                }}
              />
            </h5>
            <p className="card-text">
              {
                <input
                  readonly={!props.isAdmin}
                  type="text"
                  className="col-6 input-without-border"
                  id="description"
                  name="description"
                  value={props.description}
                  onChange={(event) => {
                    setProductToUpdate({
                      ...productToUpdate,
                      description: event.target.value,
                    });
                  }}
                />
              }
            </p>
            <p className="card-text">
              <input
                readonly={!props.isAdmin}
                type="text"
                className="col-6 input-without-border"
                id="price"
                name="price"
                value={`${props.price} €`}
                onChange={(event) => {
                  setProductToUpdate({
                    ...productToUpdate,
                    price: event.target.value,
                  });
                }}
              />
            </p>
          </div>
          <div className="card-body text-margin">
            {!props.isAdmin && !props.clickOnCart && (
              <button
                className="btn btn-lg btn-primary button-margin"
                onClick={() => {
                  setidToAdd(props.id);
                  setnbOfproduct(nbOfproduct + 1);
                  let nbItemInBasket = props.nbItem + 1;
                  props.setNbItem(nbItemInBasket);
                }}
              >
                Ajouter au panier
              </button>
            )}
            {props.isAdmin && (
              <>
                <input
                  hidden
                  readonly
                  type="text"
                  className="form-control col-6"
                  id="id"
                  name="id"
                  value={props.id}
                />
                {
                  <button
                    type="button"
                    className="btn btn-lg btn-primary button-margin"
                    onClick={() => {
                      setProductToUpdate({ ...productToUpdate });
                      setisfirstUpdate(1);
                    }}
                  >
                    Mise à jour
                  </button>
                }
                {props.isAdmin && (
                  <button
                    type="button"
                    className="btn btn btn-danger btn-lg button-margin"
                    onClick={() => {
                      setidToDelete(props.id);
                    }}
                  >
                    Supprimer
                  </button>
                )}
              </>
            )}
            {!props.isAdmin && props.clickOnCart && (
              <div class="row">
                <div class="col-4">
                  <button
                    type="button"
                    className="btn btn btn-danger btn-lg button-margin"
                    onClick={() => {
                      /* setidToDeleteFromCart(props.id);*/
                      setnbOfproductDisplay(0);
                    }}
                  >
                    Supprimer du panier
                  </button>
                </div>
                <div class="col-2 nb-of-product">
                  <input
                    className="form-control"
                    id="nbOfProduct"
                    name="nbOfProduct"
                    value={nbOfproductDisplay}
                    onChange={(event) => {
                      setnbOfproductDisplay(event.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
