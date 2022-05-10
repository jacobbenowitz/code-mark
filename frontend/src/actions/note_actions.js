import {
  getNotes,
  getNote,
  getUserNotes,
  writeNote,
  patchNote,
  deleteNote
} from '../util/note_api_util';

export const RECEIVE_NOTES = "RECEIVE_NOTES";
export const RECEIVE_NOTE = "RECEIVE_NOTE";
export const RECEIVE_USER_NOTES = "RECEIVE_USER_NOTES";
export const RECEIVE_NEW_NOTE = "RECEIVE_NEW_NOTE";
export const RECEIVE_NOTE_ERRORS = "RECEIVE_NOTE_ERRORS";
export const RECEIVE_UPDATED_NOTE = "RECEIVE_UPDATED_NOTE";
export const RECEIVE_DELETE_NOTE = "RECEIVE_DELETE_NOTE";

export const receiveNotes = notes => ({
  type: RECEIVE_NOTES,
  notes
});

export const receiveNote = note => ({
  type: RECEIVE_NOTE,
  note
});

export const receiveUserNotes = notes => ({
  type: RECEIVE_USER_NOTES,
  notes
});

export const receiveNewNote = note => ({
  type: RECEIVE_NEW_NOTE,
  note
})

export const receiveNoteErrors = errors => ({
  type: RECEIVE_NOTE_ERRORS,
  errors
})

export const receiveUpdateNote = note => ({
  type: RECEIVE_UPDATED_NOTE,
  note
})

export const receiveDeleteNote = noteId => ({
  type: RECEIVE_DELETE_NOTE,
  noteId
})

export const fetchNotes = () => dispatch => (
  getNotes()
    .then(notes => dispatch(receiveNotes(notes)))
    .catch(err => dispatch(receiveNoteErrors(err)))
);

export const fetchNote = noteId => dispatch => (
  getNote(noteId)
    .then(note => dispatch(receiveNote(note)))
    .catch(err => dispatch(receiveNoteErrors(err)))
  
)

export const fetchUserNotes = id => dispatch => (
  getUserNotes(id)
    .then(notes => dispatch(receiveUserNotes(notes)))
    .catch(err => dispatch(receiveNoteErrors(err)))
);

export const composeNote = data => dispatch => (
  writeNote(data)
    .then(note => dispatch(receiveNewNote(note)))
    .catch(err => dispatch(receiveNoteErrors(err)))
);

export const updateNote = data => dispatch => (
  patchNote()
    .then(note => dispatch(receiveUpdateNote(note)))
    .catch(err => dispatch(receiveNoteErrors(err)))
);

export const removeNote = noteId => dispatch => (
  deleteNote()
    .then(note => dispatch(receiveDeleteNote(note.id)))
    .catch(err => dispatch(receiveNoteErrors(err)))
);