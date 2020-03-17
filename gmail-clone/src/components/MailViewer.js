import React from 'react';

import MailToolbar from "./MailToolbar";
import MailList from "./MailList";

import "../styles/mail-viewer.css";

const MailViewer = ({ emails }) => {
  return (
    <div className='mail-viewer'>
      <MailToolbar />
      <MailList 
        emails={emails}
      />
    </div>
  )
}

export default MailViewer;