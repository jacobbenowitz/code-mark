import axios from "axios";

export const getNotes = () => {
  return axios.get('/api/notes')
};

export const getNote = noteId => {
  return axios.get(`/api/notes/${noteId}`)
}

export const getUserNotes = userId => {
  return axios.get(`/api/notes/user/${userId}`)
};

export const writeNote = data => {
  return axios.post('/api/notes', data)
};

export const patchNote = (data, noteId) => {
  return axios.patch(`/api/note/${noteId}/edit`, data)
};

export const deleteNote = noteId => {
  return axios.delete(`api/note/${noteId}`)
};