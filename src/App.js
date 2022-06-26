import "./App.css";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Components/Products";
import Login from "./Components/Login";
import Register from "./Components/Register";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isAccess, setIsAccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  return (
    <div className="App">
      {isAccess && <NavBar isAdmin={isAdmin} setIsInCart={setIsInCart} />}
      <Routes>
        <Route
          path="/"
          element={
            <Login
              isAccess={isAccess}
              setIsAccess={setIsAccess}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route path="/Products" element={<Products />} />
        <Route
          path="/Administration"
          element={<Products isAdmin={isAdmin} isInCart={isInCart} />}
        />
        <Route path="/Register" element={<Register />} />
      </Routes>
      {/* {isAccess && <NavBar />}
      {!isAccess && (
        <div>
          <Login
            isAccess={isAccess}
            setIsAccess={setIsAccess}
            setIsAdmin={setIsAdmin}
          />
          <Register />
        </div>
      )}
      {isAccess && <Products isAdmin={isAdmin} />} */}
    </div>
  );
}

export default App;
