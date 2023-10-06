import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";
import AllEmployee from "./pages/AllEmployee";
import { AppContextProvider, useAppContext } from "./appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </div>
  );
}

export default App;
