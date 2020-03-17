import React from 'react';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MailViewer from "./components/MailViewer";
import Dock from "./components/Dock";

import "./styles/global.css";
import emailData from "./data/emails";

function App() {
  
  const [emails, setEmails] = React.useState(emailData.messages);

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
            emails={emails}
          />
          <Dock />
        </div>
      </div>
    </div>
  );
}

export default App;
