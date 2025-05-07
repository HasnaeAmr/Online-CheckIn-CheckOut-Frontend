import React, { useState , useEffect } from "react";
import './assests/content.css';
import './assests/users.css';
import './assests/filterSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const FilterServices = ({ filters, setFilters }) => {
    

    return (
        <div className="filter-container">
            <div className="filter">
                <label htmlFor="nom">Nom</label>
                <div className="search-input">
                    <input 
                        type="text" 
                        id="nom" 
                        name="nom" 
                        value={filters.nom}
                        onChange={(e) => setFilters({...filters, nom: e.target.value})}
                        placeholder="Rechercher par nom..."
                    />
                    
                </div>
            </div>
            
            <div className="filter">
                <label htmlFor="firstName">Description</label>
                <div className="search-input">
                    <input 
                        type="text" 
                        id="description" 
                        name="description" 
                        value={filters.description}
                        onChange={(e) => setFilters({...filters, description: e.target.value})}
                        placeholder="Rechercher par description..."
                    />
                    
                </div>
            </div>
            
            <div className="filter">
                <label htmlFor="cin">Prix</label>
                <div className="search-input">
                    <input 
                        type="number" 
                        id="prix" 
                        name="prix" 
                        value={filters.prix}
                        onChange={(e) => setFilters({...filters, prix: e.target.value})}
                        placeholder="Rechercher par prix..."
                    />
                    
                </div>
            </div>
            
        
        </div>
    );
};