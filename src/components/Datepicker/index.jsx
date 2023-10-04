import React, { useState } from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Datepicker = () => {
  const [selected, setSelected] = useState();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, 'PPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  
  return (
    <DayPicker
      mode="single"
      required
      selected={selectedDay}
      onSelect={setSelectedDay}
      footer={footer}
    />
  );
}

export default Datepicker;