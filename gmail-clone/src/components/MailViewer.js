import React from 'react';

import MailToolbar from "./MailToolbar";
import MailList from "./MailList";
import SingleEmailView from "./SingleEmailView";

import "../styles/mail-viewer.css";

/* MailViewer contains the main body of the app. It includes the toolbar and the
a container for the inbox. If an email is selected, the inbox container is
replaced with a single email view. */
/* TODO: implement pagination, probably out of scope of this project */
/* TODO: clean up props */
const MailViewer = (props) => {
  // rerender when new emails are selected
  React.useEffect(() => {}, [props.selectedEmails.length])

  // determine which emails to display based on current filter
  // TODO: scale to larger list of filters
  let toDisplay = [...props.emails];
  if (props.activeFilter == "starred") {
    toDisplay = toDisplay.filter((e) => props.starredEmails.includes(e.id));
  }

  return (
    <div className='mail-viewer'>
      {/* display toolbar */}
      <MailToolbar 
        activeEmail          = {props.activeEmail}
        return               = {props.return}
        selectAll            = {props.selectAll}
        deselectAll          = {props.deselectAll}
        selectedEmails       = {props.selectedEmails}
        markAsUnread         = {props.markAsUnread}
        deleteEmail          = {props.deleteEmail}
        markSelectedAsRead   = {props.markSelectedAsRead}
        markSelectedAsUnread = {props.markSelectedAsUnread}
        deleteSelected       = {props.deleteSelected}
        toggleSelected       = {props.toggleSelected}
      />

      {/* if no email is selected, show inbox */}
      {props.activeEmail == null && (
        <MailList 
          emails             = {toDisplay}
          activeTag          = {props.activeTag}
          setTag             = {props.setTag}
          updateStarredList  = {props.updateStarredList}
          markAsRead         = {props.markAsRead}
          updateSelectedList = {props.updateSelectedList}
          starredEmails      = {props.starredEmails}
          selectedEmails     = {props.selectedEmails}
          readEmails         = {props.readEmails}
          goToEmail          = {props.goToEmail}
        />
      )}

      {/* if an email is selected, show the full email */}
      {props.activeEmail != null && (
        <SingleEmailView
          email={props.activeEmail}
          updateStarredList = {props.updateStarredList}
          starredEmails     = {props.starredEmails}
        />
      )}
    </div>
  )
}

export default MailViewer;