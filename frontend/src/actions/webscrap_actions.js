import { getStuff, getKeywords } from "../util/webscrap_util";
// const {getStuff, getKeywords} = require('../util/webscrap_util');

export const RECEIVE_NOTE_RESOURCES = 'RECEIVE_NOTE_RESOURCES';

export const receiveResources = resources => ({
    type: RECEIVE_NOTE_RESOURCES,
    resources
})

export const getResources = codebody => dispatch => {
    var keywords = getKeywords(codebody);
    // debugger
    return getStuff(keywords,codebody)
        .then(res => {
            // debugger
            const links = res.map(obj => obj.link)
            const unique_links = res.filter(({link},idx) => !links.includes(link, idx+1))
            dispatch(receiveResources(unique_links))
        })
}

// let code = "var x = myFunction(4, 3); document.getElementById('demo').innerHTML = x; function myFunction(a, b) { return a * b;}"
// console.log(getKeywords(code));