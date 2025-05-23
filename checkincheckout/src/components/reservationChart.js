import { Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, // Required for Doughnut
  Tooltip,
  Legend 
} from 'chart.js';
import { useEffect, useRef } from 'react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export const ReservationChart = ({ reservations }) => { 
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const statusCounts = {
    pending: reservations.filter(r => r.type === 'Single').length,
    confirmed: reservations.filter(r => r.type === 'Double').length,
    completed: reservations.filter(r => r.type === 'Family').length
  };

  const chartData = {
    labels: ['En Attente', 'Confirmée', 'Terminée'],
    datasets: [{
      label: "Statut des Réservations",
      data: [statusCounts.pending, statusCounts.confirmed, statusCounts.completed],
      backgroundColor: [
       '#7DD3FC', 
        '#38BDF8', 
        '#0369A1',
      ],
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      }
    },
    cutout: '70%', 
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Doughnut 
        ref={chartRef}
        data={chartData} 
        options={chartOptions} 
      />
    </div>
  );
};