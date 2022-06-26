import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("/");
  const navigate = useNavigate();
  useEffect(() => {
    if (isSubmit) {
      fetch("http://localhost:3001/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ name: name, password: password }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          props.setIsAccess(res.isAccess);
          props.setIsAdmin(res.isAdmin);
          setPage(res.isAdmin ? "Administration" : "Products");
        });
    }
  }, [isSubmit]);

  return (
    <div className="container">
      <form
        className="form-margin"
        onSubmit={(event) => {
          event.preventDefault();
          setName(event.target.name.value);
          setPassword(event.target.password.value);
          setIsSubmit(true);
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
            placeholder="Name"
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
        {props.isAccess === false && (
          <div className="pb-password">Mot de passe ou login erroné</div>
        )}
        <button
          type="submit"
          className="btn btn btn-danger btn-lg button-margin"
          onClick={
            props.isAccess &&
            (() => {
              navigate(page);
            })
          }
        >
          Log in
        </button>
        <button
          type="submit"
          className="btn btn btn-danger btn-lg button-margin"
          onClick={() => {
            navigate("/Register");
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
