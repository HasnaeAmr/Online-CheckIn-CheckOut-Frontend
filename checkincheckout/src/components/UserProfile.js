import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BasePage } from "./adminBasePage";
import 'react-toastify/dist/ReactToastify.css';
import './assests/userProfile.css';
import './assests/content.css';

export const UserProfile = () => {
    const { token, user: authUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        email: '',
        role: ''
    });
    const [errors, setErrors] = useState({});

    const fetchUserData = async () => {
        try {
            if (!authUser?.id) return;
            
            const response = await axios.get(
                `http://localhost:8080/api/user/${authUser.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            setFormData({
                nom: response.data.nom || '',
                prenom: response.data.prenom || '',
                cin: response.data.cin || '',
                email: response.data.email || '',
                role: response.data.role || authUser.role || '',
               
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [authUser?.id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nom) newErrors.nom = 'Nom est obligatoire';
        if (!formData.prenom) newErrors.prenom = 'Prénom est obligatoire';
        if (!formData.cin) newErrors.cin = 'CIN est obligatoire';
        if (!formData.email) {
            newErrors.email = 'Email est obligatoire';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email n'est pas valide";
        }
        
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            const payload = {
                id: authUser.id,
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                cin: formData.cin,
                role: formData.role,
                password: authUser.password
            };

            await axios.put(
                `http://localhost:8080/api/user/${authUser.id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Votre profil a été modifié!', {
                position: 'top-center',
                autoClose: 3000
            });
            
            setIsEditing(false);
            fetchUserData(); 
            
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || 'Échec de la mise à jour', {
                position: 'top-right',
                autoClose: 3000
            });
        }
    };

    return (
        <>
            <BasePage/>
            <div className="content">
                <div className="user-profile-container">
                    <ToastContainer />
                    <div className="profile-header">
                        <h2>Mon Profil</h2>
                        {!isEditing ? (
                            <button 
                                className="edit-bttn"
                                onClick={() => setIsEditing(true)}
                            >
                                Modifier
                            </button>
                        ) : (
                            <div className="action-buttons">
                                <button 
                                    className="cancel-btn"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setErrors({});
                                        fetchUserData();
                                    }}
                                >
                                    Annuler
                                </button>
                                <button 
                                    className="edit-bttn"
                                    onClick={handleSave}
                                >
                                    Enregistrer
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="profile-details">
                        <div className="form-group">
                            <label>Nom</label>
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        className={errors.nom ? 'error' : ''}
                                    />
                                    {errors.nom && <span className="error-message">{errors.nom}</span>}
                                </>
                            ) : (
                                <div className="profile-value">{formData.nom}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Prénom</label>
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        className={errors.prenom ? 'error' : ''}
                                    />
                                    {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                                </>
                            ) : (
                                <div className="profile-value">{formData.prenom}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>CIN</label>
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="cin"
                                        value={formData.cin}
                                        onChange={handleChange}
                                        className={errors.cin ? 'error' : ''}
                                    />
                                    {errors.cin && <span className="error-message">{errors.cin}</span>}
                                </>
                            ) : (
                                <div className="profile-value">{formData.cin}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            {isEditing ? (
                                <>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </>
                            ) : (
                                <div className="profile-value">{formData.email}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            {isEditing ? (
                                <div className="profile-value non-editable role-badge">
                                    {formData.role.toUpperCase()}
                                </div>
                            ) : (
                                <div className="profile-value non-editable role-badge">
                                    {authUser?.role?.toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};