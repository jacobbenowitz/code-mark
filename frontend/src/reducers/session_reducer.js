import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN
} from "../actions/session_actions";

import {
  RECEIVE_USER_NOTES
} from '../actions/note_actions';
import { selectNoteTags } from "../util/selectors";

import {
  RECEIVE_UPDATED_USER,
  RECEIVE_DELETED_USER,
  RECEIVE_USER_NEW_FOLLOWING
} from "../actions/user_actions"

import {
  RECEIVE_NOTE_LIKE, RECEIVE_NOTE_UNLIKE
} from '../actions/note_actions'

const initialState = {
  isAuthenticated: false,
  user: {},
  tags: [],
  followers: [],
  following: [],
  noteLikes: []
};

const SessionReducer = (state = initialState, action) => {
  let nextState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      }
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      }
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      }
    case RECEIVE_UPDATED_USER:
      // debugger
      nextState.user = action.user.data;
      return nextState;
    case RECEIVE_USER_NEW_FOLLOWING:
      // debugger;
      nextState.user = action.users.data.currentUser;
      return nextState;
    case RECEIVE_DELETED_USER:
      return {
        isAuthenticated: false,
        user: undefined
      }
    case RECEIVE_USER_NOTES:
      // debugger
      nextState.tags = selectNoteTags(action.notes.data)
      return nextState;
    case RECEIVE_NOTE_LIKE:
      nextState.user.noteLikes = nextState.user.noteLikes.concat([action.note.data._id])
      return nextState;
    case RECEIVE_NOTE_UNLIKE:
      nextState.user.noteLikes = nextState.user.noteLikes.filter(id => id !== action.note.data._id)
      return nextState;
    default:
      return state;
  }
}

export default SessionReducer;