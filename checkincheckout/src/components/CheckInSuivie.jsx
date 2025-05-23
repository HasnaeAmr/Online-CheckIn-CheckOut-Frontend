import React, { useState } from 'react';
import SidebarNav from '../components/SideBar';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FactureSuivi.css';
import '../styles/bootstrap-tables-only.css';
import { CiInboxIn } from 'react-icons/ci';

const CheckinSuivie = () => {
  const [reservationId, setReservationId] = useState('');
  const [checkinDetails, setCheckinDetails] = useState(null);
  const [montantCheckin, setMontantCheckin] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkinStatus, setCheckinStatus] = useState('');
  const navigate = useNavigate();

  const fetchCheckinDetails = async () => {
    if (!reservationId) {
      setError('Veuillez entrer un ID de réservation.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/check_in/reservation/${reservationId}`);

      if (typeof response.data === 'string' && response.data.includes('non encore effectué')) {
        setCheckinStatus('non_effectue');
        setCheckinDetails(null);
        setMontantCheckin(null);
        setError('');
      } else {
        setCheckinDetails(response.data);
        setCheckinStatus('effectue');

        const montantRes = await axios.get(`/api/facture/Montant_checkin`, {
          params: { id_reservation: reservationId }
        });
        setMontantCheckin(montantRes.data);
        setError('');
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 404) {
        setError('Réservation introuvable.');
      } else {
        setError('Erreur serveur.');
      }
      setCheckinDetails(null);
      setCheckinStatus('');
      setMontantCheckin(null);
    }
  };

  const openDocumentScan = () => {
    if (checkinDetails?.id_documentScan) {
      const documentUrl = `http://localhost:8080/api/mock_documents/preview/${checkinDetails.id_documentScan}`;
      window.open(documentUrl, '_blank');
    }
  };

  const handleValidateCheckin = async () => {
    if (checkinDetails?.status.toLowerCase() === 'en_attente') {
      try {
        await axios.post(`/api/check_in/validercheckinreception`, null, {
          params: { id_checkin: checkinDetails.id }
        });
        setCheckinDetails({
          ...checkinDetails,
          status: 'validé',
        });
      } catch (err) {
        setError('Erreur lors de la validation du check-in.');
      }
    }
  };

  const handleAddCheckin = () => {
    navigate(`/ajoutcheckin/${reservationId}`);
  };

  return (
    <div className="container">
      <Header />
      <div className="right-side">
        <SidebarNav />
        <div className="content flex-grow-1 p-4">
          <h1 className="fs-4 fw-bold mb-4">Suivi du Check-in</h1>

          <form onSubmit={(e) => { e.preventDefault(); fetchCheckinDetails(); }} className="form">
            <div>
              <label>Numéro de réservation:</label>
              <input
                type="number"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              />
            </div>
            <button type="submit">Voir le check-in</button>
          </form>

          {loading && <p>Chargement...</p>}
          {error && <p className="text-danger fw-semibold mb-3">{error}</p>}

          {checkinStatus === 'non_effectue' && (
            <div className="alert alert-warning mt-3">
              <p className="mb-2">Check-in non encore effectué pour cette réservation.</p>
              <button onClick={handleAddCheckin} className="btn-valider">
                Ajouter Check-in
              </button>
            </div>
          )}

          {checkinDetails && (
            <div className="table-responsive mt-4">
              <h2 className="table-title">Détails du Check-in</h2>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>ID Réservation</th>
                    <td>{checkinDetails.id_reservation}</td>
                  </tr>
                  <tr>
                    <th>Date Check-in</th>
                    <td>{checkinDetails.dateCheckIn}</td>
                  </tr>
                  <tr>
                    <th>Statut</th>
                    <td>
                      {checkinDetails.status.toLowerCase() === 'validé' ? (
                        <span className="badge custom-validé">Validé</span>
                      ) : (
                        <span className="badge custom-en-attente">En attente</span>
                      )}
                    </td>
                  </tr>
                  {montantCheckin !== null && (
                    <tr>
                      <th>Montant</th>
                      <td>{montantCheckin.toFixed(2)} MAD</td>
                    </tr>
                  )}
                  {checkinDetails.id_documentScan && (
                    <tr>
                      <th>Document</th>
                      <td>
                        <button onClick={openDocumentScan} className="action-btn">
                          <CiInboxIn />
                        </button>
                      </td>
                    </tr>
                  )}
                  {checkinDetails.status.toLowerCase() === 'en_attente' && (
                    <tr>
                      <th>Action</th>
                      <td>
                        <button onClick={handleValidateCheckin} className=" btn-valider">
                          Valider
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckinSuivie;