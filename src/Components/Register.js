import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
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
          navigate("/");
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
          setEmail(event.target.email.value);
          setPassword(event.target.password.value);
          setFamilyName(event.target.familyName.value);
          setIsSubmit(true);
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
        <button
          type="submit"
          className="btn btn btn-danger btn-lg button-margin"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
