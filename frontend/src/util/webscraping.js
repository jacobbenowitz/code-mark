/* global gapi */
import axios from 'axios';
import cheerio, { load } from 'cheerio';
// import keys from '../../../config/keys';
// import Nightmare from 'nightmare';
// import fs from 'fs';

// export const getAdvice = (keyword) => {
//     // const nightmare = Nightmare({ show: true });
//     const nightmare = Nightmare();
//     return nightmare
//         .goto('https://developer.mozilla.org/en-US/')
//         .wait('#hp-search-q')
//         .type('#hp-search-q',keyword)
//         .click('#hp-search-form > button.button.action.has-icon.search-button')
//         .wait('#content > article > div.search-results > ul > li:nth-child(1) > p.search-result-url > a')
//         //need wait to timeout for gibberish words so wrong wait query
//         .evaluate(() => {
//                 let link = document.querySelector('#content > article > div.search-results > ul > li:nth-child(1) > h3 > a').href;
//                 let title = document.querySelector('#content > article > div.search-results > ul > li:nth-child(1) > h3 > a').textContent;
//                 return {link,title};
//             })
//         .end()
//         .catch(err => console.log('search failed:',err))
// }

// const getAdvice2 = async (keyword) => {
//     try {
//         // keywords.forEach(async (keyword) => {
//             const {data} = await axios.get(`https://developer.mozilla.org/en-US/search?q=${keyword.split(' ').join('+')}`);
//             // const {data} = await axios.get(`https://www.google.com/search?q=${keyword.split(' ').join('+')}`);
//             const $ = cheerio.load(data);
//             console.log(data);
//             const advice = [];
//             // console.log($('.search-result-url > a'));
//             // $('.search-result-url > a').each((_idx,element) => {
//             console.log(`https://developer.mozilla.org/en-US/search?q=${keyword.split(' ').join('+')}`)
//             // console.log($('h3').length)
//             $('h > a').each((_idx,element) => {
//             // $('p.search-result-url ').each((idx,element) => {
//             // $(".yuRUbf > a").each((idx,element) => {
//                 // console.log($(element).attr('href'))
//                 // console.log($(element).text())
//                 // advice.push($(element).attr('href'));
//                 advice.push($(element).text());
//             });
//             // $('.search-result-url').each((_idx,element) => advice.push($(element).text()));
//             // console.log(help);
//             // if (help.length !== 0){
//             //     // advice.push(help)
//             // }
//         // })
//         return advice;
//     } catch (error) {
//         throw error;
//     }
// };
//cheerio doesn't work for dynamically populated websites

const AXIOS_OPTIONS = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    },
};

export const getGoogleAdvice = (search) => {
    const encodedString = encodeURI(search);
    // console.log(`https://www.google.com/search?q=${encodedString}&hl=en&gl=us`);
    return axios
        .get(`https://www.google.com/search?q=${encodedString}&hl=en&gl=us`, AXIOS_OPTIONS)
        .then(({ data }) => {
            let $ = cheerio.load(data);
            const links = [];
            const titles = [];

            $(".yuRUbf > a").each((idx, element) => {
                links[idx] = $(element).attr('href');
            });

            $(".yuRUbf > a > h3").each((idx, element) => {
                titles[idx] = $(element).text();
            });

            const result = [];
            for (let i = 0; i < links.length; i++) {
                result[i] = {
                    link: links[i],
                    title: titles[i]
                };
            }
            // console.log(result);
            return result.slice(0, 1);

        })
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyBbMNb35uKdamKUgLuPoM0pIQYjdQnzXC0");
    gapi.client.init({ 
        clientId: '997672679088-785p3ssh8ct1alunahva81nkdi001pds.apps.googleusercontent.com',
        scope: "https://www.googleapis.com/auth/spreadsheets.readonly"
    });
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute(search) {
    return gapi.client.search.cse.list({
      "cx": "82db9046b5c6d06ba",
      "num": 1,
      "q": search
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
                return response;
            },
            function(err) { console.error("Execute error", err); });
}

export const getAdvice = (search) => {
    return loadClient()
        .then(() => {
            return execute(search)
            .then(response => {
                return {
                    link: response.items[0].link,
                    title: response.items[0].title
                };
            })
        })
}