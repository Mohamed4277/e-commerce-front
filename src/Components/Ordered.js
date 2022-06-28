import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import TestStorage from "./TestStorage";

function Ordered(props) {
  const navigate = useNavigate();
  return (
    <>
      <TestStorage />
      <NavBar
        isAdmin={props.isAdmin}
        setNbItem={props.setNbItem}
        nbItem={props.nbItem}
      />
      <div className="col">
        <div className="col ordered-text">Merci pour vos achats</div>
        <div className="col ordered-button">
          <button
            type="button"
            class="btn btn-lg btn-success"
            onClick={() => navigate("/Products")}
          >
            Retour à la liste des produits
          </button>
        </div>
      </div>
    </>
  );
}

export default Ordered;
