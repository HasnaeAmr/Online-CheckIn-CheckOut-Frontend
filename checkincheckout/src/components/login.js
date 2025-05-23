import React, { useState } from 'react';
import './assests/LogInSignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';

export function LogIn() {
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
                <div className="text">Connexion</div>
                <div className="underline"></div>
            </div>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className='inputs'>
               
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

                
            </div>

            <div className="auth-toggle-container">
            
                <button 
                    className={`auth-toggle-btn ${"primary"}`}
                    onClick={handleLogin}
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
}