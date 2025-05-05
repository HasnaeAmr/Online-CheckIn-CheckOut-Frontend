import React, { useState } from 'react';
import './assests/LogInSignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';

export default function LogInSignup(props) {
    const { login } = useAuth();
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
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [action, setAction] = useState(props.action === "login" ? 'Login' : "Sign up");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // Validate all required fields
        if (!formData.nom || !formData.cin || !formData.prenom || !formData.role || !formData.password || !formData.confirmerPassword) {
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

        // Check password match
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

                // Reset form after successful submission
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

                // Switch to login view after success
                setAction("Login");
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

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Tous les champs sont obligatoires");
            return;
        }

        setError("");
        try {
            const response = await axios.post("http://localhost:8080/api/user/login", {
                email: formData.email,
                password: formData.password
            });
            
            if (response.status === 200) {
                login(response.data);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Identifiants incorrects");
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className='inputs'>
                {/* Sign Up Fields (hidden during login) */}
                {action === "Sign up" && (
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
                        <div className='input-field'>
                            <input 
                                type="text" 
                                placeholder='Numéro de Passeport' 
                                onChange={handleChange}
                                value={formData.numeroPassport}
                                name="numeroPassport"
                                className="input"
                            />
                        </div>
                        <div className="radio-options-horizontal">
                            {['CLIENT', 'ADMIN', 'RECEPTIONIST'].map((role) => (
                                <label key={role} className="radio-option-horizontal">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleChange}
                                        required
                                        className="radio-input"
                                    />
                                    <span className="radio-custom-horizontal"></span>
                                    <span className="radio-label-horizontal">
                                        {role === 'RECEPTIONIST' ? 'Réceptionniste' : role}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {/* Common Fields (shown in both login and signup) */}
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

                {/* Password Confirmation (signup only) */}
                {action === "Sign up" && (
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
                )}
            </div>

            <div className="auth-toggle-container">
                <button 
                    className={`auth-toggle-btn ${action === "Login" ? "secondary" : "primary"}`}
                    onClick={action === "Login" ? (e) => {
                        setAction("Sign up");
                    } : handleSignup}
                >
                    S'inscrire
                </button>
                <button 
                    className={`auth-toggle-btn ${action === "Sign up" ? "secondary" : "primary"}`}
                    onClick={action === "Sign up" ? (e) => {
                        setAction("Login");
                    } : handleLogin}
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
}