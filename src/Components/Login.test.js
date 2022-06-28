import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./Login";

describe("Login", () => {
  test("input name", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    screen.getByText("Log in");
    const nameInputEl = screen.getByPlaceholderText("Name");
    fireEvent.change(nameInputEl, {
      target: { value: "Client" },
    });
    await waitFor(() => {
      expect(nameInputEl.value).toBe("Client");
    });
  });
  test("input password", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    screen.getByText("Log in");
    const nameInputEl = screen.getByPlaceholderText("Password");
    fireEvent.change(nameInputEl, {
      target: { value: "Client" },
    });
    await waitFor(() => {
      expect(nameInputEl.value).toBe("Client");
    });
  });
});
