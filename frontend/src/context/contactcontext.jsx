import { createContext, useContext, useState, useCallback } from "react";
import * as api from "../api/contactapi";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadContacts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.fetchContacts(params);
      setContacts(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, []);

  const addContact = async (formData) => {
    const res = await api.createContact(formData);
    setContacts((prev) => [res.data.data, ...prev]);
    return res.data.data;
  };

  const editContact = async (id, formData) => {
    const res = await api.updateContact(id, formData);
    setContacts((prev) =>
      prev.map((c) => (c._id === id ? res.data.data : c))
    );
    return res.data.data;
  };

  const removeContact = async (id) => {
    await api.deleteContact(id);
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const toggleFav = async (id) => {
    const res = await api.toggleFavorite(id);
    setContacts((prev) =>
      prev.map((c) => (c._id === id ? res.data.data : c))
    );
  };

  return (
    <ContactContext.Provider
      value={{ contacts, loading, error, loadContacts, addContact, editContact, removeContact, toggleFav }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);