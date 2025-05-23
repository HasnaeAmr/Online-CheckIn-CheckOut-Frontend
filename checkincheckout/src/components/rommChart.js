import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';
import { useEffect, useRef } from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const RoomChart = ({ chambres }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const roomCounts = {
    single: chambres.filter(chambre => chambre.type === 'Single').length,
    double: chambres.filter(chambre => chambre.type === 'Double').length,
    familiere: chambres.filter(chambre => chambre.type === 'Family').length
  };

  const roomChartData = {
    labels: ['Single', 'Double', 'Familière'],
    datasets: [{
      label: "Nombre de chambres",
      data: [roomCounts.single, roomCounts.double, roomCounts.familiere],
      backgroundColor: [
        '#7DD3FC', 
        '#38BDF8', 
        '#0369A1',
      ],
      borderWidth: 1,
      borderRadius: 5,
      barThickness: 30,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Bar 
        ref={chartRef}
        data={roomChartData} 
        options={chartOptions} 
      />
    </div>
  );
};
