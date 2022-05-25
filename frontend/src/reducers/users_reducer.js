import {
    RECEIVE_USER,
    RECEIVE_USERS,
    RECEIVE_UPDATED_USER,
    RECEIVE_USER_NEW_FOLLOWING
} from "../actions/user_actions";

const initialState = {
    all: {},
    user: {},
    new: undefined
}

const usersReducer = (prevState = initialState, action) => {
    Object.freeze(prevState);
    let nextState = Object.assign({}, prevState)
    switch (action.type) {
        case RECEIVE_USER:
            nextState.user = action.user.data;
            return nextState;
        case RECEIVE_USERS:
            let allUsers = {};
            nextState.all = action.users.data.map(user => 
                allUsers[user._id] = user)
            nextState.all = allUsers;
            return nextState;
        case RECEIVE_USER_NEW_FOLLOWING:
            // debugger;
            // nextState.all[action.user.data._id] = action.user.data;
            nextState.user = action.users.data.followedUser;
            return nextState;
        case RECEIVE_UPDATED_USER:
            nextState.user = action.user.data;
            return nextState;
        default:
            return prevState;
    }
}

export default usersReducer;