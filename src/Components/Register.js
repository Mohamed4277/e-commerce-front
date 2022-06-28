import React, { useState, useEffect } from "react";
import TestStorage from "./TestStorage";
import { useNavigate, Link } from "react-router-dom";

function Register(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [familyName, setFamilyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmit) {
      fetch("http://localhost:3001/add-client", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          name: name,
          familyName: familyName,
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          props.setIsAccess(res.isAccess);
          props.setIsAdmin(res.isAdmin);
        });
    }
  }, [isSubmit]);

  return (
    <div className="container">
      <TestStorage />
      <form
        className="form-margin"
        onSubmit={(event) => {
          event.preventDefault();
          setName(event.target.name.value);
          setEmail(event.target.email.value);
          setPassword(event.target.password.value);
          setFamilyName(event.target.familyName.value);
          setIsSubmit(true);
          /*navigate("/");*/
        }}
      >
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="name">
            Nom de Famille
          </label>
          <input
            type="text"
            className="form-control"
            id="familyName"
            name="familyName"
            placeholder="Nom de Famille"
          />
        </div>
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="name">
            Prénom
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Prénom"
          />
        </div>
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="name">
            email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="email"
          />
        </div>
        <div className="form-group text-margin">
          <label className="label-margin" htmlFor="name">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group text-margin"></div>

        <input type="submit" id="button" name="Test" />

        {/* <button type="submit" className="btn btn-success btn-lg button-margin">
          Sign up
        </button> */}
      </form>
    </div>
  );
}

export default Register;
