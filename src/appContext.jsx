import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = AppContext.Provider;

const AppContextConsumer = AppContext.Consumer;

export const useAppContext = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [addUser, setAddUser] = useState(true);
    const [editUser, setEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [employeeName, setEmployeeName] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedDayStart, setSelectedDayStart] = useState(null);
    const [selectedDayEnd, setSelectedDayEnd] = useState(null);

  return {
    allUsers,
    setAllUsers,
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
