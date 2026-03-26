import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchContacts = (params) => API.get("/contacts", { params });
export const fetchContactById = (id) => API.get(`/contacts/${id}`);
export const createContact = (data) => API.post("/contacts", data);
export const updateContact = (id, data) => API.put(`/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
export const toggleFavorite = (id) => API.patch(`/contacts/${id}/favorite`);