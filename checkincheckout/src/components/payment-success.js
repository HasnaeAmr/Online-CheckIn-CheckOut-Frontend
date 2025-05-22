import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BasePage } from "./BasePage"
export const PaymentSuccess = () => {
     const { token, user } = useAuth();
      const { reservationId } = useParams();
      const navigate = useNavigate();
      const [services, setServices] = useState([]);
      const [stayDates, setStayDates] = useState({ start: '', end: '' });
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
    useEffect(() => {
        const validatePaymentAndGetReservation = async () => {
          try {
            // 1. First validate the payment
            const validationResponse = await axios.post(
              `http://localhost:8080/api/checkout/validate-payment/${4}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );
    
            
            console.log('Paiement validé avec succès');
          } catch (error) {
            toast.error('Erreur lors de la validation:', error);
            
          } 
        };
    
        validatePaymentAndGetReservation();
      }, [token, navigate]);
      const downloadFacture = async () => {
        try {
          
      
          const response = await fetch(
            `http://localhost:8080/api/checkout/facture/${1}`, 
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          
          if (!response.ok) throw new Error('Download failed');
          
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Facture_Check-Out_${1}.pdf`;
          document.body.appendChild(link);
          link.click();
          link.remove();
      
        } catch (error) {
          toast.error('Download error:', error);
        }
      };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.content}>
          {/* Checkmark icon */}
          <div style={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          
          <h2 style={styles.title}>Paiement réussi</h2>
          <p style={styles.message}>
            Votre paiement a été effectué avec succès
          </p>
          
          <button style={styles.secondaryButton}>
            <svg
              style={styles.buttonIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4b5563"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span onClick={()=>downloadFacture()} style={styles.down}>Télécharger la facture</span>
          </button>
          
          <button onClick = {() => navigate("../Services-sejour")}style={styles.tertiaryButton}>
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  card: {
    width: '100%',
    maxWidth: '28rem',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  iconContainer: {
    padding: '1rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '9999px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  },
  message: {
    color: '#4b5563',
    textAlign: 'center',
    margin: 0,
  },
  down: {
    color: '#4b5563',
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    gap: '0.5rem',
    color: '#4b5563',
    backgroundColor: 'transparent',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '1.5rem',
  },
  tertiaryButton: {
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    transition: 'color 0.2s',
  },
  buttonIcon: {
    width: '1.25rem',
    height: '1.25rem',
  },
};

export default PaymentSuccess;