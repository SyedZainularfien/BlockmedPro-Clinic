// CalendarComponent.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { ICalendarComponentProps } from '@/types';
import Container from '../container';
import Iconify from '../iconify';

import './style.css';

const CustomCalendar: React.FC<ICalendarComponentProps> = ({ initialDate = new Date(2025, 6, 7), setSelectedDate }) => {
  const [selectDate, setSelectDate] = useState<Date>(initialDate);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectDate(date);
      if (setSelectedDate) {
        setSelectedDate(date);
      }
    }
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Container hasBorders>
      <div className="py-6 md:py-8 px-4 md:px-6">
        <div className="custom-calendar-wrapper">
          <div className="custom-calendar">
            <DatePicker
              selected={selectDate}
              onChange={(date) => handleDateChange(date)}
              inline
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="calendar-header">
                  <div className="month-name">{formatMonthYear(date)}</div>
                  <div className="nav-buttons">
                    <button className="nav-button" onClick={decreaseMonth}>
                      <Iconify icon="mdi:chevron-left" width={20} />
                    </button>
                    <button className="nav-button" onClick={increaseMonth}>
                      <Iconify icon="mdi:chevron-right" width={20} />
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CustomCalendar;
