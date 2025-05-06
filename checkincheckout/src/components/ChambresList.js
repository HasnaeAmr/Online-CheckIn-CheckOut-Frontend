import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './assests/usersList.css'
import { faUser, faTrash, faPen , faBell, faUsers , faBed , faSignOut , faHouse, faSquareH, faList, faDoorOpen, faDoorClosed , faBellConcierge, faListNumeric } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditChambre } from "./editChambre"


export const ChambresList = ({filters}) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8080/api/chambres', {
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
                : 'Failed to fetch chambres'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]); 

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/chambres/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success(`La chambre d'ID ${userId} a été supprimé avec succès!`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          theme: "light",
                          style: {
                            zIndex: 9999  
                          },
                      });
                      
      fetchUsers(); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete chambre');
    }
  };

  if (loading) return <div className="loading-spinner">Loading chambres...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  const filteredUsers = users.filter(user => {
    const searchNom = String(filters.nom || '').toLowerCase();
    const searchType = String(filters.type || '').toLowerCase();
    const searchCapacite = String(filters.capacite || '');
    const searchEtage = String(filters.etage || '');
    const searchPrix = String(filters.prix || '');
    
    const userNom = String(user.nom || '').toLowerCase();
    const userType = String(user.type || '').toLowerCase();
    const userCapacite = String(user.capacite || '');
    const userEtage = String(user.etage || '');
    const userPrix = String(user.prix || '');

    const nomMatch = searchNom === '' || userNom.includes(searchNom);
    
    const typeMatch = searchType === '' || userType.includes(searchType);
    const capaciteMatch = searchCapacite === '' || userCapacite === searchCapacite;
    const etageMatch = searchEtage === '' || userEtage === searchEtage;
    const pricMatch = searchPrix === '' || userPrix === searchPrix;

    return nomMatch && typeMatch && capaciteMatch && etageMatch && pricMatch;
  });
  const getRoleClass = (type) => {
    switch(type) {
      case 'Single': return 'role-badge role-admin';
      case 'Double': return 'role-badge role-user';
      default: return 'role-badge role-other';
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleSaveSuccess = () => {
    setEditingUser(null);
    fetchUsers(); 
  };
  return (
    <div className="users-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Etage</th>
            <th>Capacité</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nom}</td>
              <td>{user.etage}</td>
              <td>{user.capacite}</td>
              <td>
              <span className={getRoleClass(user.type)}>
  {user.type.toLowerCase()  
    .split(' ')             
    .map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)  
    )
    .join(' ')}           
</span>
              </td>
              <td>{user.prix}</td>
              <td>
                <div className="action-buttons">
                <button 
                  className="edit-btn"
                  onClick={() => handleEditClick(user)}
                >
                    <FontAwesomeIcon 
  icon={faPen}
/>
                  </button>
                  <button 
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <div className="modal-overlay">
          <EditChambre
            user={editingUser}
            token={token}
            onSave={handleSaveSuccess}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ChambresList;