import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";

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
            nextState.all = action.users.data;
            return nextState;
        default:
            return prevState;
    }
}

export default usersReducer;