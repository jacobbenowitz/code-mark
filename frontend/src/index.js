import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import App from './components/app';
import { composeNote, updateNote, updateNoteLikes } from '../../frontend/src/actions/note_actions';
import { composeComment, fetchNoteComments, removeComment, updateComment, fetchComments } from '../../frontend/src/actions/comment_actions';
import { getLanguage } from '../src/util/webscrap_util';
import {testResources} from '../src/actions/webscrap_actions';
// import 'dotenv/config';

document.addEventListener('DOMContentLoaded', () => {
  // console.log(process.env.REACT_APP_TEST_API_KEY);
  let store;

  // check for session token in localStorage
  if (localStorage.jwtToken) {
    // set as the common header for the axios requests
    setAuthToken(localStorage.jwtToken);
    // decode to get user's data
    const decodedUser = jwt_decode(localStorage.jwtToken);
    // preconfigure state so we can add to store
    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser
      }
    };
    store = configureStore(preloadedState); // create store
    const currentTime = Date.now() / 1000; // save current time

    // check if token is expired
    if (decodedUser.exp < currentTime) {
      // logout user and redirect to login
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    // no session token = empty store
    store = configureStore({});
  }
  // render root component passing in store
  const root = document.getElementById('root');

  /// TEST START ///
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.composeNote = noteData => composeNote(noteData);
  window.updateNote = noteData => updateNote(noteData);
  window.composeComment = comment => composeComment(comment);
  window.removeComment = commentId => removeComment(commentId);
  window.fetchComments = () => fetchComments();
  window.fetchNoteComments = noteId => fetchNoteComments(noteId);
  window.updateComment = (comment, commentId) => updateComment(comment, commentId);
  window.getLanguage = getLanguage;
  window.updateNoteLikes = updateNoteLikes;

  window.testResources = testResources;
  /// TEST END ///
  ReactDOM.render(<Root store={store} />, root);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
