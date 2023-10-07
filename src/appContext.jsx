import { createContext, useState } from "react";

// Create an AppContext for sharing state and functions across components
const AppContext = createContext();

const AppContextProvider = AppContext.Provider;
const AppContextConsumer = AppContext.Consumer;

// Custom hook to encapsulate and manage shared application state
export const useAppContext = () => {
  // Define state variables and their initial values
  const [addUser, setAddUser] = useState(true);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [employeeName, setEmployeeName] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDayStart, setSelectedDayStart] = useState(null);
  const [selectedDayEnd, setSelectedDayEnd] = useState(null);

  // Return the state variables and their corresponding setter functions
  return {
    addUser,
    setAddUser,
    editUser,
    setEditUser,
    selectedUser,
    setSelectedUser,
    employeeName,
    setEmployeeName,
    selectedRole,
    setSelectedRole,
    selectedDayStart,
    setSelectedDayStart,
    selectedDayEnd,
    setSelectedDayEnd
  };
};

export { AppContext, AppContextProvider, AppContextConsumer };
