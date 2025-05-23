import React, { useState, useEffect } from 'react';
import './assests/LogInSignup.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BasePage } from "./adminBasePage"
export default function AddUser() {
    const navigate = useNavigate();
    const { hasRole } = useAuth();
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email: "",
        cin: "",
        numeroPassport: "",
        password: "",
        role: "",
        confirmerPassword: ""
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
        
        if (!formData.nom || !formData.cin || !formData.prenom || !formData.role || !formData.password) {
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

        if (formData.password !== formData.confirmerPassword) {
            toast.error('Les mots de passe ne correspondent pas!', {
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

        try {
            const response = await axios.post("http://localhost:8080/api/user/register", formData);
            if (response.status === 200) {
                toast.success(`Le compte ${formData.prenom} ${formData.nom} a été créé avec succès!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light"
                });
                
                setFormData({
                    prenom: "",
                    nom: "",
                    email: "",
                    cin: "",
                    numeroPassport: "",
                    password: "",
                    role: "",
                    confirmerPassword: ""
                });
                
                setTimeout(() => navigate("/users"), 5000);
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
        <>
        <BasePage/>
        <div className='content'>
        <div className="container">
    <ToastContainer />
    <div className="header">
        <div className="text">Ajout d'un Compte</div>
        <div className="underline"></div>
    </div>
    
    <div className='inputs'>
        <div className='input-field'>
            <input 
                type="text" 
                placeholder='Prénom' 
                onChange={handleChange}
                value={formData.prenom}
                name="prenom"
                required
                className="input"
            />
        </div>
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
                type="email" 
                placeholder='Email' 
                onChange={handleChange}
                value={formData.email}
                name="email"
                required
                className="input"
            />
        </div>
        
        <div className='role-selection'>
            <label className="role-label">Rôle:</label>
            <div className="radio-options">
                {['CLIENT', 'ADMIN', 'RECEPTIONIST'].map((role) => (
                    <label key={role} className="radio-option">
                        <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={formData.role === role}
                            onChange={handleChange}
                            required
                            className="radio-input"
                        />
                        <span className="radio-custom"></span>
                        <span className="radio-label">
                            {role === 'RECEPTIONIST' ? 'Réceptionniste' : role}
                        </span>
                    </label>
                ))}
            </div>
        </div>
        
        <div className='input-field'>
            <input 
                type="text" 
                placeholder='Numéro de CIN' 
                onChange={handleChange}
                value={formData.cin}
                name="cin"
                required
                className="input"
            />
        </div>
        <div className='input-field'>
            <input 
                type="password" 
                placeholder='Mot de passe' 
                onChange={handleChange}
                value={formData.password}
                name="password"
                required
                className="input"
            />
        </div>
        <div className='input-field'>
            <input 
                type="password" 
                placeholder='Confirmer mot de passe' 
                onChange={handleChange}
                value={formData.confirmerPassword}
                name="confirmerPassword"
                required
                className="input"
            />
        </div>
    </div>
    
    <div className="submit-container">
        <button className="submit-btn" onClick={handleSignup}>Ajouter</button>
    </div></div>
</div></>
    );
}