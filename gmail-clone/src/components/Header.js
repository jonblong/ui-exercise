import React from 'react';
import {ReactComponent as Hamburger} from "../icons/hamburger.svg";
import {ReactComponent as Search} from "../icons/search.svg";
import "../styles/header.css";

/* Header is (surprise) the app's header. It serves a variety of purposes in the
actual Gmail app but its uses are limited in this exercise.*/
const Header = (props) => {
  return (
    <div className='header'>
      {/* Holds the hamburger menu and Gmail logo */}
      <div className='logo-wrapper'>
        <div className='hamburger-wrapper'>
          <Hamburger className='hamburger' />
        </div>

        <img onClick={() => props.return()}className='gmail-logo' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png"></img>
      </div>

      {/* Holds the search bar, grows to fill */}
      {/* TODO: all of the search functionality, probably a stretch goal */}
      <div className='search-wrapper'>
        <div className='search-bar'>
          <Search className='search-icon' width="20px" height="20px" />
          <input className='search-input' type='text' placeholder='Search mail'></input>
        </div>
      </div>
    </div>
  )
}

export default Header;