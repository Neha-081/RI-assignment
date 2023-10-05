import React, { useState } from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import UserImage from '../../assets/user.svg';
import DateImage from '../../assets/date.svg';
import './date.css';

const Datepicker = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, 'PPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  )

  return (
    <>
    <div className='date-container'>
    <div class="left-inner-addon">
      <button>Date</button>
      <img role="img" src={DateImage} />
  </div>
  <span>&#8594;</span>
  <div class="left-inner-addon">
  <button>No Date</button>
      <img role="img" src={DateImage} />
  </div>
  </div>
    {/* <DayPicker
      mode="single"
      required
      selected={selectedDay}
      onSelect={setSelectedDay}
      footer={footer}
    /> */}
    </>
  );
}

export default Datepicker;