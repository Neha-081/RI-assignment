import './App.css';
import NoEmployee from './pages/NoEmployee';
import { Routes, Route } from 'react-router-dom';
import AddEmployee from './pages/AddEmployee';
import AllEmployee from './pages/AllEmployee';
import { AppContextProvider, useAppContext } from './appContext';

function App() {
  const appContext = useAppContext();

  return (
    <div className="App">
      <AppContextProvider value={appContext}>
    <Routes>
      {/* <Route path="/" element={<NoEmployee />} /> */}
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/" element={<AllEmployee />} />
    </Routes>
    </AppContextProvider>
  </div>
  );
}

export default App;
