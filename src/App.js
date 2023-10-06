import './App.css';
import { useState } from 'react';
import NoEmployee from './pages/NoEmployee';
import { Routes, Route } from 'react-router-dom';
import AddEmployee from './pages/AddEmployee';
import AllEmployee from './pages/AllEmployee';
import { AppContext } from './appContext';

function App() {
  const [allUsers, setAllUsers] = useState([]);

  return (
    <AppContext.Provider value={{ allUsers, setAllUsers }}>
    <div className="App">
    <Routes>
      <Route path="/" element={<NoEmployee />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/all-employee" element={<AllEmployee />} />
    </Routes>
  </div>
  </AppContext.Provider>
  );
}

export default App;
