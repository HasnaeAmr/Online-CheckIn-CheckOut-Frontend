import React from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { UsersList } from "./usersList";
import BasePage from "./BasePage";

import './assests/content.css';


const Users = () => {
    document.body.style = "background-color: #131313;";
    const { hasRole } = useAuth();
    const navigate=useNavigate();
    
    if (!hasRole('admin')) {
        navigate("/unauthorized");
    }
  
    return (
        <>
        <BasePage/>
        <div className="content">
            <h2>Admin Dashboard</h2>
            <UsersList/>
        </div>
        </>
    );
}
export default Users;
