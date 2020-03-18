import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import EmailListItem from "../components/EmailListItem";
import testEmails from "../data/testEmails"

// create DOM element for rendering
let container = null; 
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

// garbage disposal
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders time when date is the same", () => {
  act(() => {
    render(<EmailListItem email={testEmails.messages[0]} />, container);
  });
  expect(container.querySelector(".email-date").textContent).toBe("03:25");
});

it("renders full month when year is the same", () => {
  act(() => {
    render(<EmailListItem email={testEmails.messages[1]} />, container);
  });
  expect(container.querySelector(".email-date").textContent).toBe("02/05");
});