import React, { useState } from 'react';
import './assests/basepage.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { faUser, faBell, faSignOut , faSquareH, faList, faDoorOpen, faDoorClosed , faBellConcierge, faListNumeric } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BasePage = () => {
    document.body.style = "background-color: #131313;";

const { logout } = useAuth();
const navigate=useNavigate()
    return(
        <>
        
        <div className='base-page'>
        <div className='fcont'>
        <div className="logo">
        </div>
        <div className="right">
            <p><FontAwesomeIcon icon={faUser} /></p>
            <p><FontAwesomeIcon icon={faBell} /></p>
        </div>
        
        </div>
        <div className="scont">
        <div className="nav">
            <ul className="list">
                <li><FontAwesomeIcon className='icon' icon={faSquareH} /></li>
                <li><FontAwesomeIcon className='icon' icon={faList} /></li>
                <li><FontAwesomeIcon className='icon' icon={faDoorOpen} /></li>
                <li><FontAwesomeIcon className='icon' icon={faDoorClosed} /></li>
                <li><FontAwesomeIcon className='icon' icon={faBellConcierge} /></li>
            </ul>
        </div>
        <div className="buttom">
            <ul className="list">
                <li onClick={() => navigate("/UserProfile")}><FontAwesomeIcon className='icon' icon={faUser} /></li>
                <li onClick={async () => {
    try {
      await logout(); 
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Déconnexion échoue, essayer une autre fois", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "light"
                  });
    }
  }}
  ><FontAwesomeIcon className='icon' icon={faSignOut} /></li>
            </ul>
        </div>
        </div>
        </div>
        </>
    );
}

export default BasePage;