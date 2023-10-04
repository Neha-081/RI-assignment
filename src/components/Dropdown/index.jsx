import React, { useState } from 'react';
import Select from 'react-select';
import RoleImage from '../../assets/role.svg';
import './dropdown.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className='dropdown'>
        <img src={RoleImage} />
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="Select role"
      />
    </div>
  );
}

export default Dropdown;