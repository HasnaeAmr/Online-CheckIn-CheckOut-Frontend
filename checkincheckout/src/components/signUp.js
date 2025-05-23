import React, { useState } from 'react';
import './assests/LogInSignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';

export function SignUp() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email: "",
        cin: "",
        numeroPassport: "",
        password: "",
        role: "CLIENT",
        confirmerPassword: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!formData.nom || !formData.cin || !formData.prenom ||  !formData.password || !formData.confirmerPassword) {
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
            toast.error('Les mots de passe ne sont pas correspondants!', {
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
                    password: "",
                    confirmerPassword: ""
                });

                navigate("../login")
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
                <div className="text">S'inscrire</div>
                <div className="underline"></div>
            </div>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className='inputs'>
                    <>
                        <div className='input-field'>
                            <input 
                                type="text" 
                                placeholder='Prénom' 
                                onChange={handleChange}
                                value={formData.prenom}
                                name="prenom"
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
                                className="input"
                            />
                        </div>
                        <div className='input-field'>
                            <input 
                                type="text" 
                                placeholder='Numéro de CIN' 
                                onChange={handleChange}
                                value={formData.cin}
                                name="cin"
                                className="input"
                            />
                        </div>
                        
                        
                    </>
                
                <div className='input-field'>
                    <input 
                        type="email" 
                        placeholder='Email' 
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                        className="input"
                        required
                    />
                </div>
                <div className='input-field'>
                    <input 
                        type="password" 
                        placeholder='Mot de passe' 
                        onChange={handleChange}
                        value={formData.password}
                        name="password"
                        className="input"
                        required
                    />
                </div>

                    <div className='input-field'>
                        <input 
                            type="password" 
                            placeholder='Confirmer mot de passe' 
                            onChange={handleChange}
                            value={formData.confirmerPassword}
                            name="confirmerPassword"
                            className="input"
                            required
                        />
                    </div>
                
            </div>

            <div className="auth-toggle-container">
            <button 
                    className={`auth-toggle-btn ${"primary"}`}
                    onClick= { handleSignup}
                >
                    S'inscrire
                </button>
               
            </div>
        </div>
    );
}