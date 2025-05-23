import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { RiCoinsFill, RiCalendarScheduleFill } from "react-icons/ri";
import { TfiKey } from "react-icons/tfi";
import { BiRestaurant } from "react-icons/bi";
import '../assests/sideBar.css';

const SidebarNavClient = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
   
    if (location.pathname.startsWith('/booking')) setActiveButton('booking');
    else if (location.pathname.startsWith('/mes-reservations')) setActiveButton('reservations');
    else if (location.pathname.startsWith('/suivi-service')) setActiveButton('services');
    else if (location.pathname.startsWith('/suivi-facture')) setActiveButton('facture');
    else if (location.pathname.startsWith('/profile')) setActiveButton('profile');
    else if (location.pathname.startsWith('/logout')) setActiveButton('logout');
    else setActiveButton(''); 
  }, [location.pathname]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="sidebar">
      <nav className="menu">
        <Link to="/booking">
          <button
            className={activeButton === 'booking' ? 'active' : ''}
            onClick={() => handleButtonClick('booking')}
          >
            <RiCalendarScheduleFill />
          </button>
        </Link>

        <Link to="/mes-reservations/2">
          <button
            className={activeButton === 'reservations' ? 'active' : ''}
            onClick={() => handleButtonClick('reservations')}
          >
            <TfiKey />
          </button>
        </Link>

        <Link to="/suivi-service/2">
          <button
            className={activeButton === 'services' ? 'active' : ''}
            onClick={() => handleButtonClick('services')}
          >
            <BiRestaurant />
          </button>
        </Link>

        <Link to="/suivi-facture/2">
          <button
            className={activeButton === 'facture' ? 'active' : ''}
            onClick={() => handleButtonClick('facture')}
          >
            <RiCoinsFill />
          </button>
        </Link>
      </nav>

      <div className="bottom-icons">
        <Link to="/profile">
          <button
            className={activeButton === 'profile' ? 'active' : ''}
            onClick={() => handleButtonClick('profile')}
          >
            <FaUser />
          </button>
        </Link>
        <Link to="/logout">
          <button
            className={`logout ${activeButton === 'logout' ? 'active' : ''}`}
            onClick={() => handleButtonClick('logout')}
          >
            <FaSignOutAlt />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SidebarNavClient;