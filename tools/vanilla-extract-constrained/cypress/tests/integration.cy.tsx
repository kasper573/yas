import { mount } from "cypress/react18";
import { cloneElement } from "react";
import { colors } from "./styles/tokens";
import {
  validRedColor,
  validAliasedRedBackground,
  conditionalRedColor,
  validRedColorAndGreenBackground,
} from "./styles/constrained.css";

it("can define valid value", () => {
  const container = render(<div className={validRedColor} />);
  container.should("have.css", { color: colors.red });
});

it("can define valid aliased value", () => {
  render(<div className={validAliasedRedBackground} />).should("have.css", {
    background: colors.red,
  });
});

it("conditional value uses default when condition is inactive", () => {
  render(<div className={conditionalRedColor} />).should("have.css", {
    color: colors.blue,
  });
});

it("conditional value is correct when condition is active", () => {
  render(<div className={conditionalRedColor} data-condition />).should(
    "have.css",
    { color: colors.red },
  );
});

it("can define multiple properties", () => {
  render(<div className={validRedColorAndGreenBackground} />).should(
    "have.css",
    {
      color: colors.red,
      backgroundColor: colors.green,
    },
  );
});

it("defining multiple properties yield a single class name", () => {
  render(<div className={validRedColorAndGreenBackground} />)
    .then(([el]) => el.classList.length)
    .should("eq", 1);
});

function render(element: JSX.Element) {
  mount(
    cloneElement(element, {
      "data-testid": "root",
      style: testElementDefaultStyle,
    }),
  );
  return cy.get(`[data-testid="root"]`);
}

const testElementDefaultStyle = {
  width: 50,
  height: 50,
  border: "1px solid black",
};
