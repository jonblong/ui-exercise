import React from 'react';
import {ReactComponent as Back} from "../icons/back.svg"
import {ReactComponent as Unread} from "../icons/unread.svg"
import {ReactComponent as Read} from "../icons/read.svg"
import {ReactComponent as Delete} from "../icons/delete.svg"
import "../styles/mail-viewer.css";

/* The MailToolbar is displayed above the inbox. It displays two sets of tools:
   one for selected emails in the inbox and one for an active email being read.
   Different tools are displayed depending on different conditions. */
const MailToolbar = (props) => {
  let active = props.activeEmail != null;
  let atLeastOneSelected = props.selectedEmails.length > 0;

  return (
    <div className='mail-toolbar'>
      {/* show this if there is no active email */}
        {!active && (
          <div className='active-toolbar'>
            {/* select/deselect all checkbox */}
            {/* TODO make cleaner */}
            <div 
              className='toolbar-icon-wrapper' 
              onClick={atLeastOneSelected ? () => props.deselectAll() : () => props.selectAll()}
            >
              <div 
                className={atLeastOneSelected ? 'select-all selected' : 'select-all none-selected'}>
              </div>
            </div>

          {/* show this if there is at least one selected email */}
          {atLeastOneSelected && (
            <>
              {/* delete button */}
              <div className='toolbar-icon-wrapper' onClick={() => props.deleteSelected()}>
                <Delete className='toolbar-icon' width="15px" height="15px" />
              </div>

              {/* mark selected email(s) as read */}
              <div className='toolbar-icon-wrapper' onClick={() => props.markSelectedAsRead()}>
                <Read className='toolbar-icon' width="15px" height="15px" />
              </div>

              {/* mark selected email(s) as unread */}
              <div className='toolbar-icon-wrapper' onClick={() => props.markSelectedAsUnread()}>
                <Unread className='toolbar-icon' width="15px" height="15px" />
              </div>
            </>
          )}
        </div>
      )}

      {/* show this if there is an active email */}
      {active && (
        <div className='active-toolbar'>
          {/* back button */}
          <div className='toolbar-icon-wrapper' onClick={() => props.return()}>
            <Back className='toolbar-icon' width="15px" height="15px" />
          </div>

          {/* delete button */}
          <div className='toolbar-icon-wrapper' onClick={() => props.deleteEmail(props.activeEmail.id)}>
            <Delete className='toolbar-icon' width="15px" height="15px" />
          </div>

          {/* mark as unread */}
          <div className='toolbar-icon-wrapper' onClick={() => props.markAsUnread(props.activeEmail.id)}>
            <Unread className='toolbar-icon' width="15px" height="15px" />
          </div>
        </div>
      )}
    </div>
  )
}

export default MailToolbar;