import React from 'react';
import Select from 'react-select';
import RoleImage from '../../assets/role.svg';
import './dropdown.css';

// Define options for the dropdown
const options = [
  { value: 'product-designer', label: 'Product Designer' },
  { value: 'flutter-developer', label: 'Flutter Developer' },
  { value: 'qa-tester', label: 'QA Tester' },
  { value: 'product-owner', label: 'Product Owner' },
];

const Dropdown = ({ selectedRole, onChange }) => {
  return (
    <div className='dropdown'>
      <img src={RoleImage} alt="Role" />
      {/* Use the React Select component to create a dropdown */}
      <Select
        defaultValue={selectedRole}
        onChange={onChange}
        options={options}
        placeholder="Select role"
        value={selectedRole}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default Dropdown;
