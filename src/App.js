import "./App.css";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Components/Products";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Ordered from "./Components/Ordered";
import Carts from "./Components/Carts";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

function App() {
  const [isAccess, setIsAccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cookie, setCookie] = useCookies({});
  const [nbItem, setNbItem] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              isAccess={isAccess}
              setIsAccess={setIsAccess}
              setIsAdmin={setIsAdmin}
              setCookie={setCookie}
              cookie={cookie}
            />
          }
        />
        <Route
          path="/Products"
          element={
            <Products
              isAdmin={isAdmin}
              isInCart={isInCart}
              setNbItem={setNbItem}
              nbItem={nbItem}
            />
          }
        />
        <Route
          path="/Cart"
          element={
            <Carts
              isAdmin={isAdmin}
              isInCart={isInCart}
              setNbItem={setNbItem}
              nbItem={nbItem}
              setCookie={setCookie}
              cookie={cookie}
            />
          }
        />
        <Route
          path="/Ordered"
          element={<Ordered setNbItem={setNbItem} nbItem={nbItem} />}
        />
        <Route
          path="/Administration"
          element={
            <Products
              isAdmin={isAdmin}
              isInCart={isInCart}
              setNbItem={setNbItem}
              nbItem={nbItem}
            />
          }
        />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
