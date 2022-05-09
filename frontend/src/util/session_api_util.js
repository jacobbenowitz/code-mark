// set a common header for requests
// only do this once upon login, or when user refreshes the page check to ensure token is not expired

import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = userData => {
  return axios.post('/api/users/register', userData);
};

export const login = userData => {
  return axios.post('/api/users/login', userData);
};
