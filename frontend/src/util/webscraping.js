import axios from 'axios';
import cheerio from 'cheerio';
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