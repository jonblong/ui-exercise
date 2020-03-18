import React from 'react';
import {ReactComponent as Star} from "../icons/star.svg";
import "../styles/email.css";

const EmailListItem = (props) => {

  const [starred, setStarred] = React.useState(props.starred);

  // Convert date from ISO string and format based on email age
  function formatDate(date) {
    let emailSplitDate = date.split(/\D+/); // datestring into numbers
    let currentSplitDate = new Date().toISOString().split(/\D+/);

    let emailYear   = emailSplitDate[0];
    let emailMonth  = emailSplitDate[1];
    let emailDay    = emailSplitDate[2];
    let currentYear  = currentSplitDate[0];
    let currentMonth = currentSplitDate[1];
    let CurrentDay   = currentSplitDate[2];
    let hour   = emailSplitDate[3];
    let minute = emailSplitDate[4];

    if (emailYear === currentYear) {
      // if the date is today, show time
      if ((emailMonth === currentMonth) && (emailDay == CurrentDay)) {
        return `${hour}:${minute}`;
      }
      // if the date was this year, show full month and day
      return `${emailMonth}/${emailDay}`;
    }
    // if the date was before this year, show MM/DD/YY
    return `${emailMonth}/${emailDay}/${emailYear}`;
  }

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
    <div className='email'>
      {/* Star icon, clicking adds email to Starred list */}
      <div className='star-wrapper'  onClick={() => toggleStarred()}>
        <Star
              // make sure the star is yellow if the email is starred
              className={starred ? 'star star-active' : 'star star-inactive'} 
              width="15px" height="15px"
        />
      </div>
      <div className='email-sender'>{props.email.sender}</div>
      <div className='email-subject'>{props.email.subject}</div>
      <div className='email-excerpt'>- {props.email.body}</div>
      <div className='email-date'>{formatDate(props.email.date)}</div>
    </div>
  )
}

export default EmailListItem;