import React from 'react';
import {ReactComponent as Hamburger} from "../icons/hamburger.svg";
import {ReactComponent as Search} from "../icons/search.svg";
import "../styles/header.css";

const Header = () => {
  return (
    <div className='header'>
      {/* Holds the hamburger menu and Gmail logo */}
      <div className='logo-wrapper'>
        <div className='hamburger-wrapper'>
          <Hamburger className='hamburger' />
        </div>

        <img className='gmail-logo' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png"></img>
      </div>

      {/* Holds the search bar, grows to fill */}
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