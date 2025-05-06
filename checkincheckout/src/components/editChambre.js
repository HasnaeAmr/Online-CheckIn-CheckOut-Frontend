import React, { useState, useEffect } from 'react';
import './assests/LogInSignup.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assests/editUser.css'

export function EditChambre({user, onCancel, onSave }) {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { hasRole } = useAuth();
    const [formData, setFormData] = useState({
        id: user?.id,
        etage: user?.etage || "",
        nom: user?.nom || "",
        capacite: user?.capacite || "",
        type: user?.type || "",
        prix: user?.prix || "",
        password: ""
    });
    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id || "",
                nom: user.nom || "",
                etage: user.etage || "",
                prix: user.prix || "",
                capacite: user.capacite || "",
                type: user.type || "",
            });
        }
    }, [user]);
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
        
        if (!formData.nom || !formData.etage || !formData.capacite || !formData.type || !formData.prix) {
            
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
            if (user) {
              setFormData({
                id: user.id,
                nom: user.nom,
                etage: user.etage,
                type: user.type,
                capacite: user.capacite,
                prix: user.prix,
              });
            }
            onCancel();
          };

        try {
            const response = await axios.put(
                `http://localhost:8080/api/chambres/${formData.id}`,
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
                toast.success(`Le compte a été modifié avec succès!`, {
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
                        etage: "",
                        type: "",
                        capacite: "",
                        prix: "",
                        id: "",
                    });
                onSave();
            }, 4000);
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
        <div className="text">Modification de la Chambre</div>
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
                type="number" 
                placeholder='Etage' 
                onChange={handleChange}
                value={formData.etage}
                name="nom"
                required
                className="input"
            />
        </div>
        <div className='input-field'>
            <input 
                type="number" 
                placeholder='Capacité' 
                onChange={handleChange}
                value={formData.capacite}
                name="capacite"
                required
                className="input"
            />
        </div>
        
        <div className='role-selection'>
            <label className="role-label">Type:</label>
            <div className="radio-options">
                {['Single', 'Double', 'Family'].map((type) => (
                    <label key={type} className="radio-option">
                        <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={formData.type === type}
                            onChange={handleChange}
                            required
                            className="radio-input"
                        />
                        <span className="radio-custom"></span>
                        <span className="radio-label">
                            {type}
                        </span>
                    </label>
                ))}
            </div>
        </div>
        
        <div className='input-field'>
            <input 
                type="number" 
                placeholder='Prix' 
                onChange={handleChange}
                value={formData.prix}
                name="password"
                required
                className="input"
            />
        </div>
        
    </div>
    
    <div className="submit-container">
        <button className="submit-btn" onClick={handleSignup}>Modifier</button>
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