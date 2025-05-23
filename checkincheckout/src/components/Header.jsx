import React from 'react';
import '../styles/Header.css';
import { FaBell } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

import NotificationBell from '../components/NotificationBell';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
  <img src="/images/Logo.png" alt="Logo Hôtel" />
</div>
      <div className="header-right">
        {/* <button className="icon-btn">
          <FaBell className="icon" />
        </button> */}
        <NotificationBell/>
        <button className="icon-btn">

          <FaUserCircle className="icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;