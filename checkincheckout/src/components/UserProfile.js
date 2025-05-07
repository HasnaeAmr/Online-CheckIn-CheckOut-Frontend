import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BasePage } from "./adminBasePage";
import 'react-toastify/dist/ReactToastify.css';
import './assests/userProfile.css';
import './assests/content.css';

export const UserProfile = () => {
    const { token, user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const fetchUserData = async () => {
        try {
            if (!user?.id) return;
            
            const response = await axios.get(
                `http://localhost:8080/api/user/${user.id}`,
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
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user?.id, token]);

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
        
        if (formData.password && formData.password.length < 2) {
            newErrors.password = 'Password must be at least 2 characters';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            const payload = {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                cin: formData.cin,
                role: formData.role
            };

            if (formData.password) {
                payload.password = formData.password;
            }

            await axios.put(
                `http://localhost:8080/api/user/${user.id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Votre profile a été modifié!', {
                position: 'top-right',
                autoClose: 3000
            });
            
            setIsEditing(false);
            fetchUserData(); 
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed', {
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
                            Edit
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
                                Cancel
                            </button>
                            <button 
                                className="edit-bttn"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    )}
                </div>

                <div className="profile-details">
                    <div className="form-group">
                        <label>First Name</label>
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
                        <div className="profile-value non-editable role-badge">
                            {user?.role?.toUpperCase()}
                        </div>
                    </div>

                    {/* Password Fields (only in edit mode) */}
                    {isEditing && (
                        <>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Leave empty to keep current"
                                    className={errors.password ? 'error' : ''}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            {formData.password && (
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={errors.confirmPassword ? 'error' : ''}
                                    />
                                    {errors.confirmPassword && (
                                        <span className="error-message">{errors.confirmPassword}</span>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};