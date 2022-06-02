import "./App.css";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Components/Products";
import Login from "./Components/Login";
import React, { useState } from "react";

function App() {
  const [isAccess, setIsAccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="App">
      {isAccess && <NavBar />}
      {!isAccess && (
        <Login
          isAccess={isAccess}
          setIsAccess={setIsAccess}
          setIsAdmin={setIsAdmin}
        />
      )}
      {isAccess && <Products isAdmin={isAdmin} />}
    </div>
  );
}

export default App;
