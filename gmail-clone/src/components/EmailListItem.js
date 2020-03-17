import React from 'react';
import "../styles/email.css";

const EmailListItem = ({ email }) => {

  console.log(email.date.split(/\D+/));

  {/* Convert date from ISO string and format based on email age */}
  function formatDate() {
    let splitDate = email.date.split(/\D+/); // datestring into numbers
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];

    if (year == new Date().getFullYear()) {
      return `${month}/${day}`;
    }

    return `${month}/${day}/${year}`;
  }

  return (
    <div className='email'>
      <div className='email-sender'>{email.sender}</div>
      <div className='email-subject'>{email.subject}</div>
      <div className='email-excerpt'>- {email.body}</div>
      <div className='email-date'>- {email.date}</div>
    </div>
  )
}

export default EmailListItem;