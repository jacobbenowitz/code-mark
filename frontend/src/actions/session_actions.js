import * as APIUtil from '../util/session_api_util';
import { getCurrentUser } from '../util/user_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

export const receiveUserSignIn = message => ({
  type: RECEIVE_USER_SIGN_IN,
  message
})

export const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
}

export const logoutUser = message => ({
  type: RECEIVE_USER_LOGOUT,
  message
});

export const fetchCurrentUser = () => dispatch => {
  return getCurrentUser()
    .then(user => dispatch(receiveCurrentUser(user.data)))
    // .catch(err => console.log(err))
    .catch(err => dispatch(receiveErrors(err)))
}

export const login = user => dispatch => {
  return APIUtil.login(user).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded));
  })
    .then(() => dispatch(receiveUserSignIn(['success', `Hello again, ${user.usernameOrEmail}`])))
    .catch(err => dispatch(receiveErrors(err)))
};

export const logout = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken')
  // also remove token from axios header
  APIUtil.setAuthToken(false)
  dispatch(logoutUser(['success', 'User Successfully Logged Out!']))
};

export const signup = user => dispatch => {
  return APIUtil.signup(user)
    .then(() => {
      APIUtil.login({
        usernameOrEmail: user.username,
        password: user.password
      }).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
      })
    })
    .then(() => dispatch(receiveUserSignIn(['success', `Welcome to Codemark ${user.username}`])))
    // .catch(err => dispatch(receiveErrors(err.response.data)))
    .catch(err => dispatch(receiveErrors(err)))
};

