import React, { useEffect, useState } from "react";

function Product(props) {
  const { name, description, price, image, id } = props;
  const [idToDelete, setidToDelete] = useState(0);
  const [isfirstUpdate, setisfirstUpdate] = useState(0);
  const [productToUpdate, setProductToUpdate] = useState({
    name,
    description,
    price,
    image,
    id,
  });

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

  //Fetch to update a product
  /*  useEffect(() => {
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
        .then((res) => {
          console.log("mmm", res);
        });
    }
  }, [productToUpdate]);*/

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
                readonly={props.isAdmin}
                type="text"
                className="col-6 input-without-border"
                id="name"
                name="name"
                value={props.name}
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
                props.description /* <input
                readonly={props.isAdmin}
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
              /> */
              }
            </p>
            <p className="card-text">
              <input
                readonly={props.isAdmin}
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
            {!props.isAdmin && (
              <button
                type="button"
                className="btn btn-lg btn-primary button-margin"
                disabled
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
                {/* <button
                  disabled
                  type="button"
                  className="btn btn-lg btn-primary button-margin"
                  onClick={() => {
                    setProductToUpdate({ ...productToUpdate });
                    setisfirstUpdate(1);
                  }}
                >
                  Mise à jour
                </button> */}
                {
                  <button
                    type="button"
                    className="btn btn btn-danger btn-lg button-margin"
                    onClick={() => {
                      setidToDelete(props.id);
                    }}
                  >
                    Supprimer
                  </button>
                }
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
