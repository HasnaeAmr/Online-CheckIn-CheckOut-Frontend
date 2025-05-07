import React,{ useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { ServicesList } from "./ServicesList";
import './assests/content.css';
import './assests/users.css'
import AdminBasePage from "./adminBasePage";
import { faUser, faBell, faPlus , faUsers , faBed , faSignOut , faHouse, faSquareH, faList, faDoorOpen, faDoorClosed , faBellConcierge, faListNumeric } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilterServices } from "./FilterServices";
import { AddService } from "./addService";


export const Services = () => {

    document.body.style = "background-color: #131313;";
    const { hasRole } = useAuth();
const [flag, setFlag] = useState(false);

  const handleSaveSuccess = () => {
    setFlag(false);
  };
  const [filters, setFilters] = useState({
    nom: '',
    description: '',
    prix: '',
  });
 
    const navigate=useNavigate();
    
    if (!hasRole('admin')) {
        navigate("/unauthorized");
    }
  
    return (
        <>
        <AdminBasePage className="base"/>
        <div className="content">
          <div className="head">
        <h2>
        <FontAwesomeIcon icon={faUsers} style={{ fontSize: '24px', color: '#007bff' }} /> Liste des services
        </h2>
        <div className="add-user" onClick={() => {setFlag(true)}}>
          <FontAwesomeIcon icon={faPlus}/>
        </div>
        </div>
        <FilterServices
            filters={filters} 
            setFilters={setFilters} 
        />
        
        <ServicesList filters={filters} />
        </div>
        {flag && (
                <div className="modal-overlay">
                  <AddService
                    onSave={handleSaveSuccess}
                    onCancel={() => setFlag(null)}
                  />
                </div>
              )}       
        </>
    );
}
export default Services;
