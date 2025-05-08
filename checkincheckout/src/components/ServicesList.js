import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './assests/usersList.css'
import { faUser, faTrash, faPen , faBell, faUsers , faBed , faSignOut , faHouse, faSquareH, faList, faDoorOpen, faDoorClosed , faBellConcierge, faListNumeric } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditService } from "./editService"


export const ServicesList = ({filters}) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8080/api/services', {
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
                : 'Failed to fetch Services'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]); 

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/services/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(`Le service d'ID ${userId} a été supprimé avec succès!`, {
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
      setError(err.response?.data?.message || 'Failed to delete Service');
    }
  };

  if (loading) return <div className="loading-spinner">Loading services...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  const filteredUsers = users.filter(user => {
    const searchNom = String(filters.nom || '').toLowerCase();
    const searchDescription = String(filters.description || '').toLowerCase();
    const searchPrix = String(filters.prix || "");
    
    const userNom = String(user.nom || '').toLowerCase();
    const userDescription = String(user.description || '').toLowerCase();
    const userPrix = String(user.prix || '').toLowerCase();

    const nomMatch = searchNom === '' || userNom.includes(searchNom);
    const descriptionMatch = searchDescription === '' || userDescription.includes(searchDescription);
    
    const prixMatch = searchPrix === '' || userPrix == searchPrix;

    return nomMatch && descriptionMatch && prixMatch ;
  });
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
            <th>Description</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nom}</td>
              <td>{user.description}</td>
              <td>{user.prix} DH</td>
             
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
                   
                   
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <div className="modal-overlay">
          <EditService
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

export default ServicesList;