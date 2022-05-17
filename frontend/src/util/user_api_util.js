import axios from "axios";

export const getUsers = () => {
    return axios.get('/api/users')
};

export const getUser = userId => {
    debugger
    return axios.get(`/api/users/${userId}`)
}