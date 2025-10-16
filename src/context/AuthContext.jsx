import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isLoggedIn")
  );

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "081234567890",
      email: "john.doe@example.com",
      photo: "https://placehold.co/100x100/92A3FD/FFFFFF?text=JD",
      location: { lat: -6.2088, lng: 106.8456 },
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "089876543210",
      email: "jane.smith@example.com",
      photo: "https://placehold.co/100x100/9DCEFF/FFFFFF?text=JS",
      location: { lat: -7.2575, lng: 112.7521 },
    },
  ]);

  const register = (email, password) => {
    const userExists = users.find((user) => user.email === email);
    if (userExists) return false;
    const newUser = { email, password };
    setUsers([...users, newUser]);
    return true;
  };

  const login = (email, password) => {
    const foundUser = users.find((user) => user.email === email);
    if (foundUser && foundUser.password === password) {
      setIsAuthenticated(true);
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
  };

  const addContact = (contactData) => {
    const newContact = { ...contactData, id: Date.now() };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    register,
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
