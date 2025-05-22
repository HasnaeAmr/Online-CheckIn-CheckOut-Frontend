import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BasePage } from "./BasePage"
export const UserServices = () => {
  const { token, user } = useAuth();
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [stayDates, setStayDates] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsumedServices = async () => {
      try {
        if (!token) {
            throw new Error("Authentication token missing");
          }
        const response = await axios.get(
          `http://localhost:8080/api/reservation-services/during-stay/${1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.data) {
          throw new Error("Invalid response structure");
        }
        setServices(response.data || []);

        setStayDates({
          start: response.data.startDate 
            ? new Date(response.data.startDate).toLocaleDateString() 
            : 'Date inconnue',
          end: response.data.endDate 
            ? new Date(response.data.endDate).toLocaleDateString() 
            : 'Date inconnue',
        });
        
      } catch (err) {
        const errorMsg = err.response?.data?.message || 
                        err.message || 
                        "Erreur lors du chargement des services";
        setError(errorMsg);
        toast.error(errorMsg, {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConsumedServices();
  }, [reservationId, token]);

  const calculateTotal = () => {
    return services.reduce((sum, service) => sum + (service.prix || 0), 0);
  };

  const handlePayment = async () => {
    try {
      
  
      const response = await axios.get(
        'http://localhost:8080/api/checkout/payer/4',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response) {
        window.location.href = response.data.sessionUrl;
      
        toast.success(response.data.message || 'Erreur lors du paiement');
      }
  
    } catch (error) {
      console.error('Payment error:', error);
      
      if (error.response) {
        toast.error(error.response.data?.message || 'Erreur serveur');
      } else if (error.request) {
        toast.error('Pas de réponse du serveur');
      } else {
        toast.error('Erreur de configuration');
      }
    }
  };
  if (loading) return <div className="text-center mt-5">Chargement en cours...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <>
        <BasePage/>
   
    <div className="content">
      <ToastContainer />
      
      <h2 className="mb-4">
        Vos Services Consommés pendant ce séjour
      </h2>
      <div className="card shadow">
        <div className="card-body">
          {services.length > 0 ? (
            <>
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Service</th>
                    <th className="text-end">Prix (DH)</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id || service._id}>
                      <td>{service.nom || 'Service sans nom'}</td>
                      <td className="text-end">{(service.prix || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="table-active">
                    <th>Total</th>
                    <th className="text-end">{calculateTotal().toFixed(2)} DH</th>
                  </tr>
                </tfoot>
              </table>
              
              <div className="d-flex justify-content-end mt-4">
                <button 
                  onClick={handlePayment}
                  className="btn btn-primary btn-lg"
                >
                  Payer maintenant
                </button>
              </div>
            </>
          ) : (
            <div className="alert alert-info">
              Aucun service consommé pendant ce séjour
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserServices;
