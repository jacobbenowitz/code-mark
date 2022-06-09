import {
    RECEIVE_USER,
    RECEIVE_USERS,
    RECEIVE_UPDATED_USER,
    RECEIVE_USER_NEW_FOLLOWING
} from "../actions/user_actions";

import { merge } from 'lodash';

const BUSY = 'BUSY';
const IDLE = 'IDLE';
const DONE = 'DONE';

const initialState = {
    all: {},
    user: {},
    new: undefined,
    status: IDLE
}


const usersReducer = (prevState = initialState, action) => {
    Object.freeze(prevState);
    let nextState = merge({}, prevState);
    
    switch (action.type) {
        case RECEIVE_USER:
            nextState.user = action.user.data;
            nextState.status = DONE;
            return nextState;
        case RECEIVE_USERS:
            let allUsers = {};
            nextState.all = action.users.data.map(user => 
                allUsers[user._id] = user)
            nextState.all = allUsers;
            nextState.status = DONE;
            return nextState;
        case RECEIVE_USER_NEW_FOLLOWING:
            nextState.user = action.users.data.followedUser;
            return nextState;
        case RECEIVE_UPDATED_USER:
            nextState.user = action.user.data[0];
            return nextState;
        default:
            return prevState;
    }
}

export default usersReducer;