import React, { useState } from 'react';
import Select from 'react-select';
import RoleImage from '../../assets/role.svg';
import './dropdown.css';

const options = [
  { value: 'product-designer', label: 'Product Designer' },
  { value: 'flutter-developer', label: 'Flutter Developer' },
  { value: 'qa-tester', label: 'QA Tester' },
  { value: 'product-owner', label: 'Product Owner' },
];

const Dropdown = ({selectedRole, onChange}) => {
  
  return (
    <div className='dropdown'>
        <img src={RoleImage} />
      <Select
        defaultValue={selectedRole}
        onChange={onChange}
        options={options}
        placeholder="Select role"
        value={selectedRole}
        style={{width: '100%'}}  
      />
    </div>
  );
}

export default Dropdown;