// /* global gapi */
const axios = require('axios');
const apiKey = require('../config/keys').apiKey;
const engineId = require('../config/keys').engineId;

async function getResources(keywords) {
    let response = await Promise.all(getPromises(keywords));
    return response.filter(ele => ele !== undefined);
}

function getPromises(keywords) {
    const resources = [];
    keywords.forEach(keyword => {
        resources.push(getGoogleAdvice(keyword)
            .then(data => {
                return data;
            }));
    });
    return resources;
}

const AXIOS_OPTIONS = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    },
};

const getGoogleAdvice = (search) => {
    const encodedString = encodeURI(search);
    return axios
        .get(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodedString}&hl=en&gl=us`, AXIOS_OPTIONS)
        .then(({data}) => {
            // console.log(data.items[0]);
            return {
                link: data.items[0].link,
                title: data.items[0].title
            }
        })
}

module.exports = getResources;

getGoogleAdvice('github');