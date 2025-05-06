import React, { useState , useEffect } from "react";
import './assests/content.css';
import './assests/users.css';
import './assests/filterSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const FilterChambres = ({ filters, setFilters }) => {
    const roles = ["Single", "Double", "Family"]; 
    

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
                <label htmlFor="firstName">Etage</label>
                <div className="search-input">
                    <input 
                        type="number" 
                        id="firstName" 
                        name="firstName" 
                        value={filters.etage}
                        onChange={(e) => setFilters({...filters, etage: e.target.value})}
                        placeholder="Rechercher par prénom..."
                    />
                    
                </div>
            </div>
            
            <div className="filter">
                <label htmlFor="capacite">Capacité</label>
                <div className="search-input">
                    <input 
                        type="number" 
                        id="capacite" 
                        name="capacite" 
                        value={filters.capacite}
                        onChange={(e) => setFilters({...filters, capacite: e.target.value})}
                        placeholder="Rechercher par CIN..."
                    />
                    
                </div>
            </div>
            
            <div className="filter">
                <label htmlFor="type">Type</label>
                <div className="search-select">
                    <select 
                        id="type" 
                        name="type" 
                        value={filters.type}
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                        {roles.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterChambres;