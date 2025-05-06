import React, { useState , useEffect } from "react";
import './assests/content.css';
import './assests/users.css';
import './assests/filterSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const FilterSection = ({ filters, setFilters }) => {
    const roles = ["Admin", "Client", "Réceptionist"]; 
    

    return (
        <div className="filter-container">
            <div className="filter">
                <label htmlFor="lastName">Nom</label>
                <div className="search-input">
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={filters.nom}
                        onChange={(e) => setFilters({...filters, nom: e.target.value})}
                        placeholder="Rechercher par nom..."
                    />
                    
                </div>
            </div>
            
            <div className="filter">
                <label htmlFor="firstName">Prénom</label>
                <div className="search-input">
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={filters.prenom}
                        onChange={(e) => setFilters({...filters, prenom: e.target.value})}
                        placeholder="Rechercher par prénom..."
                    />
                    
                </div>
            </div>
            
            <div className="filter">
                <label htmlFor="cin">CIN</label>
                <div className="search-input">
                    <input 
                        type="text" 
                        id="cin" 
                        name="cin" 
                        value={filters.cin}
                        onChange={(e) => setFilters({...filters, cin: e.target.value})}
                        placeholder="Rechercher par CIN..."
                    />
                    
                </div>
            </div>
            
            <div className="filter">
                <label htmlFor="role">Rôle</label>
                <div className="search-select">
                    <select 
                        id="role" 
                        name="role" 
                        value={filters.role}
                        onChange={(e) => setFilters({...filters, role: e.target.value})}
                    >
                        {roles.map((role, index) => (
                            <option key={index} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};