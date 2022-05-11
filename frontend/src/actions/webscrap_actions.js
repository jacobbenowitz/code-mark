import { getStuff } from "../util/webscrap_util";

export const RECEIVE_NOTE_RESOURCES = 'RECEIVE_NOTE_RESOURCES';

export const receiveResources = resources => ({
    type: RECEIVE_NOTE_RESOURCES,
    resources
})

export const getResources = words => dispatch => {
    return getStuff(words)
        .then(res => dispatch(receiveResources(res)))
}