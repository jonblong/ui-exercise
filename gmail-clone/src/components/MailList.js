import React from 'react';

import EmailListItem from "./EmailListItem";

import "../styles/mail-viewer.css";

const MailList = ({ emails }) => {
  return (
    <div className='mail-list'>
      {emails.map((e, i) => (
        <EmailListItem
          email={e}
        />
      ))}
    </div>
  )
}

export default MailList;