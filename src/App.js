import './App.css';
import { useState } from 'react';
import NoEmployee from './components/NoEmployee';
import { Routes, Route } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<NoEmployee />} />
      <Route path="/add-employee" element={<AddEmployee />} />
    </Routes>
  </div>
  );
}

export default App;
