import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import EmailListItem from "../components/EmailListItem";
//import testEmails from "../data/testEmails"

let currentDate = new Date();
let day   = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
let month = (currentDate.getMonth() + 1 < 10 ? '0' : '') + (currentDate.getMonth() + 1);
let year = currentDate.getFullYear();

let testEmails = {
  messages: [
    {
      "id": "1",
      "subject": "Test Email 1",
      "sender": "jonbrantleylong@gmail.com",
      "body": "Hire Jon Long!",
      "tags": ["work"],
      "date": `${currentDate.getFullYear()}-${month}-${day}T03:25:43.511Z`
    },
    {
      "id": "2",
      "subject": "Test Email 1",
      "sender": "jonbrantleylong@gmail.com",
      "body": "Hire Jon Long!",
      "tags": ["work"],
      "date": `${currentDate.getFullYear()}-02-05T03:25:43.511Z`
    },
  ]
}

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

// will render the time if the email was sent today
it("renders time when date is the same", () => {
  act(() => {
    render(<EmailListItem email={testEmails.messages[0]} />, container);
  });
  expect(container.querySelector("#date-1").textContent).toBe("03:25");
});

// will render MM/DD when the email was sent this year
it("renders full month when year is the same", () => {
  act(() => {
    render(<EmailListItem email={testEmails.messages[1]} />, container);
  });
  expect(container.querySelector("#date-2").textContent).toBe("02/05");
});