import {
    getUser,
    getUsers,
    patchUser,
    deleteUser
} from "../util/user_api_util";
import { logout } from "./session_actions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER";
export const RECEIVE_DELETED_USER = "RECEIVE_DELETED_USER";
export const RECEIVE_USER_FOLLOW = "RECEIVE_USER_FOLLOW";
export const RECEIVE_USER_UNFOLLOW = "RECEIVE_USER_UNFOLLOW";

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

/// new actions for RECEIVE_USER_FOLLOW / UNFOLLOW

export const fetchUsers = () => dispatch => (
    getUsers()
        .then(users => dispatch(receiveUsers(users)))
        .catch(err => console.log(err))
);

export const fetchUser = userId => dispatch => {
    return getUser(userId)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
};

export const updateUser = userData => dispatch => {
    return patchUser(userData)
        .then(user => dispatch(receiveUpdatedUser(user)))
        .catch(err => console.log(err))
}

export const removeUser = userId => dispatch => {
    return deleteUser(userId)
        .then((userId) => dispatch(receiveDeletedUser(userId)))
        .catch(err => console.log(err))
}

export const addUserFollower = (userData) => {
    return patchUser(userData)
        .then(user => dispatch(receiveUpdatedUser(user)))
        .catch(err => console.log(err))
}

export const removeUserFollower = (userData) => {
    return patchUser(userData)
        .then(user => dispatch(receiveUpdatedUser(user)))
        .catch(err => console.log(err))
}

/// edit user thunk replace above thunks