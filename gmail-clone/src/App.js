import React from 'react';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MailViewer from "./components/MailViewer";
import Dock from "./components/Dock";

import "./styles/global.css";
import emailData from "./data/emails";

function App() {

  // set state
  const [allEmails, setAllEmails]           = React.useState(emailData.messages);
  const [starredEmails, setStarredEmails]   = React.useState([]);
  const [readEmails, setReadEmails]         = React.useState([]); 
  const [selectedEmails, setSelectedEmails] = React.useState([]);
  const [activeEmail, setActiveEmail]       = React.useState(null);
  const [activeTag, setActiveTag]           = React.useState(null);

  // mark a given email as read
  function markAsRead(emailID) {
    let newRead = readEmails;
    if (!newRead.includes(emailID)) {
      newRead.push(emailID);
    }
    setReadEmails(newRead);
  }

  // mark a given email as unread, return to inbox view
  function markAsUnread(emailID) {
    let newRead = readEmails;
    newRead = newRead.filter((id) => id !== emailID);
    setReadEmails(newRead);
    returnToInbox();
  }

  // delete a single email given its id
  function deleteEmail(emailID) {
    let newEmails = [...allEmails];
    newEmails = newEmails.filter((email) => email.id !== emailID);
    setAllEmails(newEmails);
    returnToInbox();
  }

  // delete any email currently selected
  function deleteSelected() {
    let newEmails = [...allEmails];
    newEmails = newEmails.filter((email) => !selectedEmails.includes(email.id));
    setAllEmails(newEmails);
    deselectAll();
  }

  // mark every selected email as read
  function markSelectedAsRead() {
    setReadEmails([...selectedEmails]);
  }

  // mark every selected email as unread
  function markSelectedAsUnread() {
    let newRead = [...readEmails]
    newRead = newRead.filter((id) => !selectedEmails.includes(id));
    setReadEmails(newRead);
  }

  // select every email
  function selectAll() {
    let newSelected = [];
    for (let i = 0; i < allEmails.length; i++) {
      // only select emails for the current tag
      if (((activeTag != null) && (allEmails[i].tags.includes(activeTag))) || activeTag == null) {
        newSelected.push(allEmails[i].id);
      }
    }
    setSelectedEmails(newSelected);
  }

  // deselect every selected email
  function deselectAll() {
    setSelectedEmails([]);
  }

  // add or remove email from list of selected emails
  function updateSelectedList(emailID) {
    let newSelected = [...selectedEmails];
    if (newSelected.includes(emailID)) {
      newSelected = newSelected.filter((id) => id !== emailID);
    } else {
      newSelected.push(emailID);
    }
    setSelectedEmails(newSelected);
  }

  // add or remove email from list of starred emails
  function updateStarredList(emailID) {
    let newStarred = [...starredEmails];
    if (newStarred.includes(emailID)) {
      newStarred = newStarred.filter((id) => id !== emailID);
    } else {
      newStarred.push(emailID);
    }
    setStarredEmails(newStarred);
  }

  // clear the current active email
  function returnToInbox() {
    setActiveEmail(null);
  }

  // sets the active email and marks it as read
  function goToEmail(email) {
    setActiveEmail(email);
    markAsRead(email.id);
    setSelectedEmails([]);
  }

  // sets the active tag
  // TODO: make this scale to user-created tags
  function setTag(newTag) {
    if (newTag != "travel" && newTag != "work" && newTag != null) {
      console.log("NOT A VALID TAG");
    } else {
      setActiveTag(newTag)
    }
  }

  return (
    <div className="App">
      {/* blurred background image */}
      <div className='bg-image'></div>

      <div className="app-wrapper">
        {/* Navigation, Search, etc. */}
        <Header 
          return={returnToInbox}
        />

        {/* Includes everything under the header */}
        {/* TODO organize props, maybe into objects? */}
        <div className='main-wrapper'>
          <Sidebar />
          <MailViewer 
            emails               = {allEmails}
            updateStarredList    = {updateStarredList}
            updateSelectedList   = {updateSelectedList}
            markAsRead           = {markAsRead}
            deleteEmail          = {deleteEmail}
            markSelectedAsRead   = {markSelectedAsRead}
            markSelectedAsUnread = {markSelectedAsUnread}
            deleteSelected       = {deleteSelected}
            markAsUnread         = {markAsUnread}
            starredEmails        = {starredEmails}
            readEmails           = {readEmails}
            selectedEmails       = {selectedEmails}
            goToEmail            = {goToEmail}
            selectAll            = {selectAll}
            deselectAll          = {deselectAll}
            activeEmail          = {activeEmail}
            activeTag            = {activeTag}
            setTag               = {setTag}
            return               = {returnToInbox}
          />

          {/* Small panel on the right side of the screen */}
          <Dock />
        </div>
      </div>
    </div>
  );
}

export default App;
