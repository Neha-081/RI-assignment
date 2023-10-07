import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";
import AllEmployee from "./pages/AllEmployee";
import { AppContextProvider, useAppContext } from "./appContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const appContext = useAppContext();

  return (
    <div className="App">
      <AppContextProvider value={appContext}>
        {/* Define the application's routes using the 'Routes' component */}
        <Routes>
          <Route path="/" element={<AllEmployee />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
      </AppContextProvider>
      {/* Display notifications using 'ToastContainer' from react-toastify */}
      <ToastContainer />
    </div>
  );
}

export default App;

