const axios = require('axios');
const apiKey = require('../config/keys').apiKey;
const engineId = require('../config/keys').engineId;
const Resource = require('../models/Resource');
const hljs = require('highlight.js')

async function getResources(keywords, codebody) {
    const language = getLanguage(codebody);
    const languageKeywords = keywords.map(keyword => language + ' ' + keyword);
    const search = [];
    languageKeywords.forEach(keyword => {
        search.push(Resource.findOne({ keyword: keyword })
            .then(resource => {
                return resource;
            })
            .catch(err => {
                return null     //maybe just return google search url if api requests run out
            }));
    })
    let found = await Promise.all(search);
    let savedResources = found.filter(ele => ele !== null).map(ele => ele._doc);
    let foundWords = savedResources.map(ele => ele.keyword);
    const notfound = languageKeywords.filter(word => !foundWords.includes(word))
    let response = await Promise.all(getPromises(notfound));
    let foundResources = response.map(ele => ele._doc);
    return foundResources.concat(savedResources).filter(ele => ele !== undefined);
}

function getLanguage(codebody) {
    const languages = ['JavaScript', 'CSS', 'HTML', 'C++'];
    const code_test = hljs.highlightAuto(codebody, languages);
    return code_test.language;
}

function getPromises(keywords) {
    const resources = [];
    keywords.forEach(keyword => {
        resources.push(getGoogleAdvice(keyword)
            .then(data => {
                const newResource = new Resource({
                    keyword: data.keyword,
                    link: data.link,
                    title: data.title
                })
                return newResource.save()
                    .then(() => { return newResource; })
                    .catch(err => {
                    });
            })
            .catch(err => {
                console.log(err)
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

//get search results
const getGoogleAdvice = (search) => {
    const encodedString = encodeURI(search);
    return axios
        .get(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodedString}&hl=en&gl=us`, AXIOS_OPTIONS)
        .then(({ data }) => {
            // console.log(data.items[0]);
            return {
                keyword: search,
                link: data.items[0].link,
                title: data.items[0].title
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = getResources;

// getResources(['github','haha','console.log','ruby','html','body','javascript','java','eventlistener','print']).then(res => console.log(res));