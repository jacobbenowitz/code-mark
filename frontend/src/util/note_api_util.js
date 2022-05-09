import axios from "axios";

export const getNotes = () => {
  return axios.get('/api/notes')
};

export const getUserNotes = userId => {
  return axios.get(`/api/notes/user/${userId}`)
};

export const writeNote = data => {
  return axios.post('/api/notes/', data)
};