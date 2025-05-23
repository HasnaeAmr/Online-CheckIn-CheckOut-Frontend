import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { BasePage } from './adminBasePage';
import { DashboardCalendar } from './DashBoardCalendar'
import { RoomChart } from './rommChart'
import { ReservationChart } from './reservationChart'
import { CheckInOutChart } from './checkInOut'
import "./assests/dashboard.css"
import { faUser, faTrash, faUserShield , faPen , faUserTie ,  faBell, faUsers , faBed , faSignOut , faHouse, faSquareH, faList, faDoorOpen, faDoorClosed , faBellConcierge, faListNumeric, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Dashboard = () => {
  const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [chambres, setChambres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const { logout } = useAuth();
const navigate=useNavigate()
const getRoleClass = (role) => {
  switch(role) {
    case 'ADMIN': return 'role-badge role-admin';
    case 'CLIENT': return 'role-badge role-user';
    default: return 'role-badge role-other';
  }
};
const getIcon = (role) => {
  switch(role) {
    case 'ADMIN': return 'faUserTie';
    case 'CLIENT': return 'faUser';
    default: return 'faUserShield';
  }
};
const getIconClass = (role) => {
  switch(role) {
    case 'ADMIN': return 'admin';
    case 'CLIENT': return 'client';
    default: return 'recep';
  }
};
const fetchUsers = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await axios.get('http://localhost:8080/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    setUsers(response.data);
  } catch (error) {
    setError(error.response?.data?.message || 
            (error.response?.status === 403 
              ? 'You are not authorized to access this resource' 
              : 'Failed to fetch users'));
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
    fetchUsers();
  }, [token]); 


const fetchServices = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await axios.get('http://localhost:8080/api/services', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    setServices(response.data);
  } catch (error) {
    setError(error.response?.data?.message || 
            (error.response?.status === 403 
              ? 'You are not authorized to access this resource' 
              : 'Failed to fetch services'));
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
    fetchServices();
  }, [token]); 

const fetchChambres = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await axios.get('http://localhost:8080/api/chambres', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    setChambres(response.data);
  } catch (error) {
    setError(error.response?.data?.message || 
            (error.response?.status === 403 
              ? 'You are not authorized to access this resource' 
              : 'Failed to fetch chambres'));
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
    fetchChambres();
  }, [token]); 
  const yearlyStats = {
    checkIns: [45, 60, 75, 82, 90, 120, 150, 140, 110, 95, 70, 50],
    checkOuts: [40, 55, 70, 80, 85, 115, 145, 135, 105, 90, 65, 45]
  };
  return (
    <>
    <BasePage/>
    <div className="content">
    <h2 className='title'>Dashboard</h2>
    <p className='dash-text'>Gérez facilement vos données, suivez vos performances et accédez rapidement à toutes vos fonctionnalités essentielles.</p>

      <div className="statisctics-container">
        <div className="card card1">
          
        <h4 className='tit'>Réservations</h4>
        <ReservationChart reservations={chambres}/>
          
        </div>
        <div className="card" onClick={() => navigate('../Services')}>
        <h4>Check-In & Check-Out</h4>
        <CheckInOutChart className="graph" yearlyData={yearlyStats} />
        </div>
        <div className="card" onClick={() => navigate('../chambres')}>
        <h4>Chambres</h4>
        <RoomChart chambres={chambres} />
            
        </div>
      </div>
      <div className="news">
        <div className="ucontainer">
          <h4><FontAwesomeIcon className='users-icon' icon={faUsers} /> Les nouvaux utilisateurs</h4>
                <table className="users">
                  <thead>
                    <tr>
                    <th></th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
  {users
    .slice(-4)      
    .reverse()      
    .map(user => (
      <tr key={user.id}>
        <td>
          {user.role.toLowerCase() === 'admin' ? <FontAwesomeIcon className={getIconClass(user.role)} icon={faUserTie} /> : ""}
            {user.role.toLowerCase() === 'receptionist' ? <FontAwesomeIcon className={getIconClass(user.role)} icon={faUserShield} />: ""}
            {user.role.toLowerCase() === 'client' ? <FontAwesomeIcon className={getIconClass(user.role)} icon={faUser} />: ""}
        </td>
        <td>{user.nom}</td>
        <td>{user.prenom}</td>
        <td>
          <span className={getRoleClass(user.role)}>
            {user.role.toLowerCase()  
              .split(' ')             
              .map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)  
              )
              .join(' ')}           
          </span>
        </td>
      </tr>
    ))
  }
</tbody>
                </table>
        </div>
        <div className="updates">
          <DashboardCalendar/>
        </div>
      </div>
    </div>
    </>
 )}
export default Dashboard;
