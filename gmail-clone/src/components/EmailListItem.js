import React from 'react';
import {ReactComponent as Star} from "../icons/star.svg";
import {formatDate} from "../Utils";
import "../styles/email.css";

/* The inbox is dynamically populated by EmailListItems. They track whether they
are read/unread, starred or selected, */
const EmailListItem = (props) => {

  // set initial state
  const [starred, setStarred]   = React.useState(props.starred);
  const [selected, setSelected] = React.useState(props.selected);
  const [read, setRead]         = React.useState(props.read);

  // add click listeners on mount
  /* TODO: make click functionality cleaner. When a clickable node has clickable
  children it becomes messy and stopPropagation slows the app down. */
  React.useEffect(() => {
    document.getElementById(`email-${props.email.id}`).addEventListener('click', function(event) {
      if (this === event.target) {
        props.goToEmail(props.email)
      }
    });

    document.getElementById(`email-mobile-${props.email.id}`).addEventListener('click', function(event) {
      if (this === event.target) {
        props.goToEmail(props.email)
      }
    });
  }, []);

  // update state when props change
  React.useEffect(() => {
    setSelected(props.selected);
    setStarred(props.starred);
    setRead(props.read);
  }, [props])

  // toggle starred and add/remove from parent StarredEmails array
  function toggleStarred() {
    if (starred) {
      setStarred(false);
    } else {
      setStarred(true);
    }
    props.updateStarredList(props.email.id);
  }

  // toggle selected and add/remove from parent SelectedEmails array
  function toggleSelected() {
    if (selected) {
      setSelected(false);
    } else {
      setSelected(true);
    }
    props.updateSelectedList(props.email.id);
  }

  return (
    // dynamically assign id for event listener, set style based on read/unread
    <>
      <div 
        id={`email-${props.email.id}`}
        className={`email email-desktop ${props.read ? 'read' : 'unread'}`} 
      >
        {/* Checkbox icon, clicking toggles email selection */}
        <div 
          className='icon-wrapper' id={`checkbox-${props.email.id}`}
          onClick={() => toggleSelected()}
        >
          <div className={`checkbox ${selected ? 'checked' : 'unchecked'}`}></div>
        </div>

        {/* Star icon, clicking adds email to Starred list */}
        <div
          className='icon-wrapper' id={`star-${props.email.id}`}
          onClick={() => toggleStarred()}
        >
          <Star
                // make sure the star is yellow if the email is starred
                className={starred ? 'star star-active' : 'star star-inactive'}
                width="15px" height="15px"
          />
        </div>

        {/* Displays sender, subject, an excerpt of the email body and the date */}
        <div className='email-text' onClick={() => props.goToEmail(props.email)}>
          <div className={`email-sender ${!read ? 'bold' : ''}`}>{props.email.sender}</div>
          <div className={`email-subject ${!read ? 'bold' : ''}`}>{props.email.subject}</div>
          <div className='email-excerpt'>- {props.email.body}</div>
          <div 
            id={`date-${props.email.id}`}
            className={`email-date ${!read ? 'bold' : ''}`}
          >{formatDate(props.email.date)}</div>
        </div>
      </div>

      <div 
        id={`email-mobile-${props.email.id}`}
        className={`email email-mobile ${props.read ? 'read' : 'unread'}`} 
      >
        <div 
          className='icon-wrapper' id={`checkbox-${props.email.id}`}
          onClick={() => toggleSelected()}
        >
          <div className={`checkbox ${selected ? 'checked' : 'unchecked'}`}></div>
        </div>

        <div className='email-details-mobile' onClick={() => props.goToEmail(props.email)}>
          {/* Holds sender name and date */}
          <div className='mobile-sender-container'>
            <div className={`email-sender ${!read ? 'bold' : ''}`}>{props.email.sender}</div>
            <div className={`email-date ${!read ? 'bold' : ''}`}>{formatDate(props.email.date)}</div>
          </div>
          
          {/* Holds subject, body snippet and star */}
          <div className='mobile-email-snippet'>
            <div className={`email-subject ${!read ? 'bold' : ''}`}>{props.email.subject}</div>
            <div className='email-excerpt'>{props.email.body}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailListItem;