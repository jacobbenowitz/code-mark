import {
    getUser,
    getUsers,
    patchUser,
    deleteUser,
    editUserFollowers
} from "../util/user_api_util";
import { logout } from "./session_actions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER";
export const RECEIVE_DELETED_USER = "RECEIVE_DELETED_USER";
export const RECEIVE_USER_NEW_FOLLOWING = "RECEIVE_USER_NEW_FOLLOWING";
export const RECEIVE_USER_ERROR = "RECEIVE_USER_ERROR";

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const receiveDeletedUser = userId => ({
    type: RECEIVE_DELETED_USER,
    userId
})

export const receiveUpdatedUser = user => ({
    type: RECEIVE_UPDATED_USER,
    user
})

export const receiveUserNewFollowing = users => ({
    type: RECEIVE_USER_NEW_FOLLOWING,
    users
})

export const receiveUserErrors = error => ({
    type: RECEIVE_USER_ERROR,
    error
})

// thunk actions

export const fetchUsers = () => dispatch => (
    getUsers()
        .then(users => dispatch(receiveUsers(users)))
        .catch(err => console.log(err))
        // .catch(err => dispatch(receiveUserErrors(err.response.data)))
);

export const fetchUser = userId => dispatch => {
    return getUser(userId)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
        // .catch(err => dispatch(receiveUserErrors(err.response.data)))
};

export const updateUser = userData => dispatch => {
    return patchUser(userData)
        .then(user => dispatch(receiveUpdatedUser(user)))
        .catch(err => dispatch(receiveUserErrors(err.response.data)))
}

export const removeUser = userId => dispatch => {
    return deleteUser(userId)
        .then((userId) => dispatch(receiveDeletedUser(userId)))
        .catch(err => dispatch(receiveUserErrors(err.response.data)))
}

export const changeUserFollowers = (userId) => dispatch => {
    // debugger;
    return editUserFollowers(userId)
        .then(users => dispatch(receiveUserNewFollowing(users)))
        .catch(err => dispatch(receiveUserErrors(err.response.data)))
}
