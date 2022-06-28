import React from "react";

function TestStorage() {
  const isAccessStorage = sessionStorage.getItem("isAccess");
  const isAdminStorage = sessionStorage.getItem("isAdmin");
  return (
    <>
      {/* <div>isAccessStorage: {isAccessStorage}</div>
      <div>isAdminStorage: {isAdminStorage}</div> */}
    </>
  );
}

export default TestStorage;
