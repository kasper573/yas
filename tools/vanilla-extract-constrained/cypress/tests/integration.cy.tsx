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
  const classNames = validRedColorAndGreenBackground.split(" ");
  cy.wrap(classNames).should("have.length", 1);
});

function render(element: JSX.Element) {
  cy.mount(element);
  return cy.get(":root");
}
