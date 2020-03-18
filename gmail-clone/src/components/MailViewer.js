import React from 'react';

import MailToolbar from "./MailToolbar";
import MailList from "./MailList";

import "../styles/mail-viewer.css";

const MailViewer = (props) => {
  return (
    <div className='mail-viewer'>
      <MailToolbar />
      <MailList 
        emails={props.emails}
        updateStarredList={props.updateStarredList}
        starredEmails={props.starredEmails}
      />
    </div>
  )
}

export default MailViewer;