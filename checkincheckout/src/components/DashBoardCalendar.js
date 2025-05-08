import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './assests/calendar.css'; 

export const DashboardCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    
    // Create empty slots for days before the first day of the month
    const blanks = Array(firstDayOfMonth).fill(null);
    
    // Create days of the month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return [...blanks, ...daysArray].map((day, index) => (
      <div 
        key={index} 
        className={`calendar-day ${day === currentDate.getDate() && 
                  currentDate.getMonth() === new Date().getMonth() ? 'today' : ''}
                  ${!day ? 'empty' : ''}`}
      >
        {day}
      </div>
    ));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
      <div className="dashboard-calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h3>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          <button onClick={nextMonth}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        
        <div className="calendar-weekdays">
          {days.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-days">
          {renderDays()}
        </div>
      </div>
  );
};

export default DashboardCalendar;