import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import App from './components/app';

document.addEventListener('DOMContentLoaded', () => {
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
      window.location.href = '/login';
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
  /// TEST END ///
  ReactDOM.render(<Root store={store} />, root);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
