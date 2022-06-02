import {
  RECEIVE_NEW_NOTE,
  RECEIVE_NOTES,
  RECEIVE_NOTE,
  RECEIVE_USER_NOTES,
  RECEIVE_DELETE_NOTE,
  RECEIVE_UPDATED_NOTE,
  RECEIVE_NOTE_LIKE,
  RECEIVE_NOTE_UNLIKE
} from '../actions/note_actions';

const initialState = {
  all: {},
  user: [],
  new: {},
  newResources: []
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
      // nextState.user = Object.values(action.notes.data)
      nextState.user = action.notes.data
      debugger
      return nextState;
    case RECEIVE_NOTES:
      let allNotes = {}
      action.notes.data.map(note =>
        allNotes[note._id] = note)
      nextState.all = allNotes;
      return nextState;
    case RECEIVE_NOTE:
      nextState.all[action.note.data._id] = action.note.data;
      return nextState;
    case RECEIVE_DELETE_NOTE:
      debugger;
      delete nextState.all[action.note[0]._id]
      nextState.user = nextState.user.filter(note =>
        note._id !== action.note[0]._id
      )
      debugger;
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
    default:
      return prevState;
  }
}

export default notesReducer;