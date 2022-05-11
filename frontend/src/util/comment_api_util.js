import axios from "axios";

export const getComments = () => {
    return axios.get('/api/comments')
};

export const getComment = commentId => {
    return axios.get(`/api/comments/${commentId}`)
}

export const getUserComments = userId => {
    return axios.get(`/api/comments/user/${userId}`)
};

export const writeComment = data => {
    return axios.post('/api/comments', data)
};

export const patchComment = (data, commentId) => {
    return axios.patch(`/api/comments/${commentId}/edit`, data)
};

export const deleteComment = commentId => {
    return axios.delete(`api/comments/${commentId}`)
};