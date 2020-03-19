import React from "react";
import {formatDate} from "../Utils";
import {ReactComponent as Star} from "../icons/star.svg";
import {ReactComponent as Reply} from "../icons/reply.svg";
import {ReactComponent as Forward} from "../icons/forward.svg";

/* SingleEmailView is displayed when a user selects an email from the inbox. It
replaces the inbox on the screen and clears any selections the user has made. */
const SingleEmailView = (props) => {
  // set state
  const [starred, setStarred] = React.useState(props.starredEmails.includes(props.email.id));

  /*
    Once mounted, fills in email body with text and add click listener.
    NOTE: I wouldn't normally use innerHTML but the format of the email text
    makes it neccessary. Given more time I would parse the emails into
    individual <p> elements.
  */
 React.useEffect(() => {
  document.getElementById('email-body').innerHTML = props.email.body;

  // TODO: possibly replace event listeners with JSX onClick attributes?
  document.getElementById(`star-${props.email.id}`).addEventListener('click', toggleStarred);
  return () => {
    document.getElementById(`star-${props.email.id}`).removeEventListener('click', toggleStarred);
  }
 })

 // toggle starred and add/remove from parent StarredEmails array
 function toggleStarred() {
  if (starred) {
    setStarred(false);
  } else {
    setStarred(true);
  }
  props.updateStarredList(props.email.id);
}

  return (
    <div className='single-email-view'>
      <div className='email-container'>
        {/* displays email subject and tags */}
        <div className='email-header'>
          <h1 className='subject-full'>{props.email.subject}</h1>
        </div>

        {/* displays sender, date and actions */}
        <div className='email-details'>
          {/* show sender and recipient */}
          <div className='to-and-from'>
            <b className='sender-full'>{props.email.sender}</b>
            <p className='to'>to me</p>
          </div>
          
          {/* show formatted date, star and reply icons */}
          <div className='date-and-actions'>
            <p className='date-full'>{formatDate(props.email.date)}</p>

            {/* wraps the star icon, shows highlight on hover */}
            <div className='icon-wrapper' id={`star-${props.email.id}`}>
              <Star
                // make sure the star is yellow if the email is starred
                className={starred ? 'icon star-active' : 'icon icon-dark'} 
                width="15px" height="15px"
              />
            </div>

            {/* wraps the reply icon, shows highlight on hover */}
            <div className='icon-wrapper'>
              <Reply className='icon icon-dark' width="15px" height="15px" />
            </div>
          </div>
        </div>

        {/* displays the email body, populated after render */}
        <div id='email-body'></div>

        {/* reply and forward buttons */}
        <div className='button-container'>
          <div className='button'>
            <Reply className='icon icon-dark' width="15px" height="15px" />
            <p>Reply</p>
          </div>

          <div className='button'>
            <Forward className='icon icon-dark' width="15px" height="15px" />
            <p>Forward</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEmailView;