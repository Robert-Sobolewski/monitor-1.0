import React from "react";
import NavbarComp from "./NavbarComp";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("test for navbar component", () => {
  // render(<NavbarComp />);
  const history = createMemoryHistory();
  test("if true is true", () => {
    expect(true).toBe(true);
  });
  test("render component", () => {
    <Router history={history}>
      render(
      <NavbarComp />
      ); screen.debug();
    </Router>;

    // let link = screen.getByText(/Navbar/i);
    //expect(link).toBeInTheDocument();
  });
});
