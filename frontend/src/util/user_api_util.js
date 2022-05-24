import axios from "axios";

export const getUsers = () => {
  return axios.get('/api/users')
};

export const getUser = userId => {
  return axios.get(`/api/users/${userId}`)
}

export const patchUser = userData => {
  return axios.patch(`/api/users/${userData.id}`, userData)
}

export const deleteUser = userId => {
  return axios.delete(`/api/users/${userId}`)
}

// edit user follows util
export const editUserFollowers = userId => {
  debugger;
  return axios.patch(`/api/users/followers/${userId}`)
}