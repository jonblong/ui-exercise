import React from 'react';

import EmailListItem from "./EmailListItem";

import "../styles/mail-viewer.css";

const MailList = (props) => {
  return (
    <div className='mail-list'>
      {props.emails.map((e, i) => (
        <EmailListItem
          email={e}
          key={i}
          updateStarredList={props.updateStarredList}
          starred={props.starredEmails.includes(e.id)}
        />
      ))}
    </div>
  )
}

export default MailList;