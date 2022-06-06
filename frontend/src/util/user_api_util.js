import axios from "axios";

export const getUsers = () => {
  return axios.get('/api/users')
};

export const getUser = userId => {
  return axios.get(`/api/users/${userId}`)
}

export const getCurrentUser = () => {
  return axios.get(`/api/users/current`)
}

export const patchUser = userData => {
  return axios.patch(`/api/users/${userData.id}`, userData)
}

export const deleteUser = userId => {
  return axios.delete(`/api/users/${userId}`)
}

export const editUserFollowers = userId => {
  return axios.patch(`/api/users/followers/${userId}`)
}