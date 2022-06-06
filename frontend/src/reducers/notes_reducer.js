import {
  RECEIVE_NEW_NOTE,
  RECEIVE_NOTES,
  RECEIVE_NOTE,
  RECEIVE_USER_NOTES,
  RECEIVE_DELETE_NOTE,
  RECEIVE_UPDATED_NOTE,
  RECEIVE_NOTE_LIKE,
  RECEIVE_NOTE_UNLIKE,
  REQUEST_USER_NOTES,
  REQUEST_ALL_NOTES,
  REQUEST_NOTE
} from '../actions/note_actions';

// status reflects the status of data being fetched
// idle = initial value, not fetching or awaiting data
// busy = awaiting data being fetched
// done = completed fetch of data and added to store
const BUSY = 'BUSY';
const IDLE = 'IDLE';
const DONE = 'DONE';

const initialState = {
  all: {},
  user: [],
  new: {},
  newResources: [],
  status: IDLE
};

import { merge } from 'lodash';

const notesReducer = (prevState = initialState, action) => {
  Object.freeze(prevState);
  let nextState = merge({}, prevState)
  switch (action.type) {
    case RECEIVE_NEW_NOTE:
      nextState.all[action.note.data[0]._id] = action.note.data[0];
      nextState.new = action.note.data[0];
      nextState.user.push(action.note.data[0]);
      return nextState;
    case RECEIVE_USER_NOTES:
      let allNotesUser = {}
      action.notes.data.forEach(note => allNotesUser[note._id] = note)
      nextState.all = allNotesUser;
      nextState.user = action.notes.data;
      nextState.status = DONE;
      return nextState;
    case RECEIVE_NOTES:
      let allNotes = {}
      action.notes.data.forEach(note => allNotes[note._id] = note)
      nextState.status = DONE;
      nextState.all = allNotes;
      return nextState;
    case RECEIVE_NOTE:
      nextState.status = DONE;
      nextState.all[action.note.data._id] = action.note.data;
      return nextState;
    case RECEIVE_DELETE_NOTE:
      delete nextState.all[action.note[0]._id]
      nextState.user = nextState.user.filter(note =>
        note._id !== action.note[0]._id)
      return nextState;
    case RECEIVE_UPDATED_NOTE:
      nextState.all[action.note.data[0]._id] = action.note.data[0];
      return nextState;
    case RECEIVE_NOTE_LIKE:
      nextState.all[action.note.data._id] = action.note.data;
      return nextState;
    case RECEIVE_NOTE_UNLIKE:
      nextState.all[action.note.data._id] = action.note.data;
      return nextState;
    case REQUEST_USER_NOTES:
      nextState.status = BUSY;
      return nextState;
    case REQUEST_ALL_NOTES:
      nextState.status = BUSY;
      return nextState;
    case REQUEST_NOTE:
      nextState.status = BUSY;
    default:
      return prevState;
  }
}

export default notesReducer;