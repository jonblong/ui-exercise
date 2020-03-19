import React from 'react';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MailViewer from "./components/MailViewer";
import Dock from "./components/Dock";

import "./styles/global.css";
import emailData from "./data/emails";

/* Root node for the app. */
/* TODO: more robust mobile view */
/* TODO: add more filters (trash, etc) */
/* TODO: search funtionality */
/* TODO: streamline props so components don't get 9000 */
/* TODO: get rid of/merge redundant css classes */
function App() {

  // set state
  const [allEmails, setAllEmails]           = React.useState(emailData.messages);
  const [starredEmails, setStarredEmails]   = React.useState([]);
  const [readEmails, setReadEmails]         = React.useState([]); 
  const [selectedEmails, setSelectedEmails] = React.useState([]);
  const [activeEmail, setActiveEmail]       = React.useState(null);
  const [activeTag, setActiveTag]           = React.useState(null); // work, travel. etc.
  const [activeFilter, setActiveFilter]     = React.useState(null); // inbox, starred, etc.

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
    let newRead   = [...readEmails];
    newEmails = newEmails.filter((email) => email.id !== emailID);
    newRead   = newRead.filter((email) => email.id !== emailID);
    setAllEmails(newEmails);
    setReadEmails(newRead);
    returnToInbox();
  }

  // delete any email currently selected
  function deleteSelected() {
    let newEmails = [...allEmails];
    let newRead   = [...readEmails];
    newEmails = newEmails.filter((email) => !selectedEmails.includes(email.id));
    newRead   = newRead.filter((emailID) => !selectedEmails.includes(emailID));
    setAllEmails(newEmails);
    setReadEmails(newRead);
    deselectAll();
  }

  // mark every selected email as read
  function markSelectedAsRead() {
    let newRead = [...readEmails]
    for (let i = 0; i < selectedEmails.length; i++) {
      if (!newRead.includes(selectedEmails[i])) {
        newRead.push(selectedEmails[i]);
      }
    } 
    setReadEmails(newRead);
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
  // inbox will only display emails that contain a "tag" attribute that matches the current tag
  // null tag will display the entire inbox
  // TODO: make this scale to user-created tags
  function setTag(newTag) {
    if (newTag != "travel" && newTag != "work" && newTag != null) {
      console.log("NOT A VALID TAG");
    } else {
      setActiveTag(newTag)
    }
  }

  // sets the active filter
  // filters are displayed in the sidebar and include things like starred, trash, etc
  // TODO: make this scale to more filters, this is basically brute force
  function setFilter(newFilter) {
    if (newFilter != "starred" && newFilter != null) {
      console.log("NOT A VALID FILTER");
    } else {
      setActiveFilter(newFilter);
      returnToInbox();
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
          <Sidebar 
            allEmails    = {allEmails}
            readEmails   = {readEmails}
            setFilter    = {setFilter}
            activeFilter = {activeFilter}
          />

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
            activeFilter         = {activeFilter}
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
