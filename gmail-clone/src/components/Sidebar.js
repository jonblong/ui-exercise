import React from 'react';
import "../styles/sidebar.css";

/* The sidebar allows the user to filter their inbox. Displayed on the left
side of the screen. */
const Sidebar = (props) => {
  return (
    <div className='sidebar'>
      <div className='compose-button'>Compose</div>

      <div className='filter-button-container'>
        <div
          className={`filter-button ${props.activeFilter == null ? 'filter-active' : ''}`}
          onClick={() => props.setFilter(null)}
        >
          <p>Inbox</p>
          <p>{props.allEmails.length - props.readEmails.length}</p>
        </div>

        <div
          className={`filter-button ${props.activeFilter == 'starred' ? 'filter-active' : ''}`}
          onClick={() => props.setFilter('starred')}
        >
          <p>Starred</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;