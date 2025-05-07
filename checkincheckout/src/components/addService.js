import React, { useState, useEffect } from 'react';
import './assests/LogInSignup.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assests/editUser.css'

export function AddService({onCancel, onSave }) {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { hasRole } = useAuth();
    const [formData, setFormData] = useState({
        id: "",
        nom: "",
        description:"",
        prix: "",
        
    });
   
        if (!hasRole('admin')) {
            navigate("/unauthorized");
        }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!formData.nom || !formData.description || !formData.prix) {
            
            toast.error('Tous les champs sont obligatoires!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light"
            });
            return;
        }

        const handleCancel = () => {
            onCancel();
          };

        try {
            const response = await axios.post(
                `http://localhost:8080/api/services`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                }
              ); 
                        if (response.status === 200 || response.status === 201) {
                            console.log('Showing toast for success'); 
                toast.success(`Le service ${formData.nom} a été ajouté avec succès!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light"
                });
                
                
                setTimeout(() => {
                    setFormData({
                        nom: "",
                        description: "",
                        prix: "",
                        
                    });
                onSave();
            }, 3000);
            setTimeout(() => navigate("/Services"), 1);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Une erreur est survenue durant l'enregistrement!";
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light"
            });
        }
    };

    return (
        <div className="container">
    <ToastContainer />
    <div className="header">
        <div className="text">Ajout d'un service</div>
        <div className="underline"></div>
    </div>
    
    <div className='inputs'>
        <div className='input-field'>
            <input 
                type="text" 
                placeholder='Nom' 
                onChange={handleChange}
                value={formData.nom}
                name="nom"
                required
                className="input"
            />
        </div>
        <div className='input-field'>
            <input 
                type="text" 
                placeholder='Description' 
                onChange={handleChange}
                value={formData.description}
                name="description"
                required
                className="input"
            />
        </div>
        <div className='input-field'>
            <input 
                type="number" 
                placeholder='Prix' 
                onChange={handleChange}
                value={formData.prix}
                name="prix"
                required
                className="input"
            />
        </div>
        
    </div>
    
    <div className="submit-container">
        <button className="submit-btn" onClick={handleSignup}>Ajouter</button>
        <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => onCancel()}
                    >
                Annuler</button>
    </div>
</div>
    );
}