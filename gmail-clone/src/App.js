import React from 'react';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MailViewer from "./components/MailViewer";
import Dock from "./components/Dock";

import "./styles/global.css";
import emailData from "./data/emails";

function App() {
  
  const allEmails = emailData.messages;
  const [starredEmails, setStarredEmails] = React.useState([]);

  function updateStarredList(emailID) {
    let newStarred = starredEmails;
    if (newStarred.includes(emailID)) {
      newStarred = newStarred.filter((id) => id !== emailID);
    } else {
      newStarred.push(emailID);
    }
    setStarredEmails(newStarred);
  }

  return (
    <div className="App">
      <div className='bg-image'></div>

      <div className="app-wrapper">
        {/* Navigation, Search, etc. */}
        <Header />

        {/* Includes everything under the header */}
        <div className='main-wrapper'>
          <Sidebar />
          <MailViewer 
            emails={allEmails}
            updateStarredList={updateStarredList}
            starredEmails={starredEmails}
          />
          <Dock />
        </div>
      </div>
    </div>
  );
}

export default App;
