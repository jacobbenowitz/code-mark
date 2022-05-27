import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN
} from "../actions/session_actions";

import {
  RECEIVE_NEW_NOTE,
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

import { merge } from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {},
  tags: [],
  followers: [],
  following: [],
  note_likes: []
};

const SessionReducer = (prevState = initialState, action) => {
  Object.freeze(prevState);
  let nextState = merge({}, prevState);

  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      }
    case RECEIVE_CURRENT_USER:
      const user = action.currentUser._id ? (
        action.currentUser
        ) : action.currentUser.currentUser
      debugger
      return {
        ...prevState,
        isAuthenticated: !!user,
        user: user
      }
    case RECEIVE_USER_SIGN_IN:
      return {
        ...prevState,
        isSignedIn: true
      }
    case RECEIVE_UPDATED_USER:
      nextState.user = action.user.data;
      return nextState;
    case RECEIVE_USER_NEW_FOLLOWING:
      nextState.user = action.users.data.currentUser;
      return nextState;
    case RECEIVE_DELETED_USER:
      return {
        isAuthenticated: false,
        user: undefined
      }
    case RECEIVE_USER_NOTES:
      nextState.tags = selectNoteTags(action.notes.data)
      return nextState;
    case RECEIVE_NEW_NOTE:
      let newUniqueTags =
        [...new Set(nextState.tags.concat(action.note.data.tags))]
      nextState.tags = newUniqueTags;
      // debugger
      return nextState;
    case RECEIVE_NOTE_LIKE:
      nextState.user.note_likes = nextState.user.note_likes.concat(
        [action.note.data._id])
      return nextState;
    case RECEIVE_NOTE_UNLIKE:
      nextState.user.note_likes = nextState.user.note_likes.filter(
        id => id !== action.note.data._id)
      return nextState;
    default:
      return prevState;
  }
}

export default SessionReducer;