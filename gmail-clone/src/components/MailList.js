import React from 'react';

import EmailListItem from "./EmailListItem";

import "../styles/mail-viewer.css";

/* MailList is the inbox view. It shows a list of tags/categories along the top,
and below it is a list of emails filtered according to the current tag. */
const MailList = (props) => {
  return (
    <div className='mail-list-container'>
      {/* Holds all of the category (tag) buttons */}
      {/* TODO: make less ugly... */}
      <div className='category-container'>
        <div
          className={`category ${props.activeTag == null ? 'all-tag' : ''}`}
          onClick={() => props.setTag(null)}
        >All</div>

        <div 
          className={`category ${props.activeTag == 'work' ? 'work-tag' : ''}`}
          onClick={() => props.setTag('work')}
        >Work</div>

        <div
          className={`category ${props.activeTag == 'travel' ? 'travel-tag' : ''}`}
          onClick={() => props.setTag('travel')}
        >Travel</div>
      </div>

      {/* Filter the list of emails based on current active tag, then display them */}
      {/* TODO: reformat EmailListItem props, maybe in objects? */}
      <div className='mail-list'>
        {props.emails.filter((e) => {
          if (props.activeTag == null) {
            return true;
          } else {
            return e.tags.includes(props.activeTag);
          }
        })
          .map((e, i) => (
            <EmailListItem
              email              = {e}
              key                = {i}
              updateStarredList  = {props.updateStarredList}
              updateSelectedList = {props.updateSelectedList}
              starred            = {props.starredEmails.includes(e.id)}
              selected           = {props.selectedEmails.includes(e.id)}
              read               = {props.readEmails.includes(e.id)}
              goToEmail          = {props.goToEmail}
            />
          ))
        }
      </div>

      {/* Certain mobile browsers have weird behavior with the bottom toolbar.
      This makes sure that all of the content is visible. */}
      <div className='mobile-spacer'></div>
    </div>
  )
}

export default MailList;