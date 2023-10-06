import './App.css';
import NoEmployee from './pages/NoEmployee';
import { Routes, Route } from 'react-router-dom';
import AddEmployee from './pages/AddEmployee';
import AllEmployee from './pages/AllEmployee';

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<NoEmployee />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/all-employee" element={<AllEmployee />} />
    </Routes>
  </div>
  );
}

export default App;
