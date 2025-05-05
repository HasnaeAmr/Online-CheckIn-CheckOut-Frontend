import React from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from './UserProfile';
const Dashboard = () => {
const { logout } = useAuth();
const navigate=useNavigate()
  const handlelogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <>
    <h1>Welcome</h1>
    <button onClick={handlelogout}>
      log out
    </button>
    <UserProfile/>
    </>
    
  )
}
export default Dashboard;
