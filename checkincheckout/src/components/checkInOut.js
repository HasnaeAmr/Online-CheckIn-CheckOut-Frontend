import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale,
  Tooltip,
  Legend 
} from 'chart.js';
import { useEffect, useRef } from 'react';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);
export const CheckInOutChart = ({ yearlyData }) => {
    const chartRef = useRef(null);
  
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 
                   'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  
    const chartData = {
      labels: months,
      datasets: [
        {
          label: 'Check-ins',
          data: months.map((_, i) => yearlyData.checkIns[i] || 0),
          borderColor: '#10B981', 
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.3,
          borderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: 'Check-outs',
          data: months.map((_, i) => yearlyData.checkOuts[i] || 0),
          borderColor: '#3B82F6', 
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 3
        }
      ]
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 3.5, 
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 8
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          bodyFont: {
            size: 10
          },
          titleFont: {
            size: 5
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            stepSize: 1,
            font: {
              size: 7
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 10
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    };
  
    useEffect(() => {
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, []);
  
    return (
      <div className="chart-container" style={{ height: '150px', width: '100%', padding: '10px' }}>
         <Line 
          ref={chartRef}
          data={chartData} 
          options={options} 
        />
      </div>
    );
  };
  