const axios = require('axios');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const fs = require('fs');

// axios
//     .get('https://developer.mozilla.org/en-US/docs/Web/CSS#key_resources')
//     .then(response => {
//         let $ = cheerio.load(response.data);
//         $('dd').each((_idx,element) => console.log($(element).text().trim()))
//     })
//     .catch(error => console.log(error));

const getAdvice = (keyword) => {
    // var advice = [];
    const nightmare = Nightmare({ show: true });
    nightmare
        .goto('https://developer.mozilla.org/en-US/')
        .wait('#hp-search-q')
        .type('#hp-search-q',keyword)
        .click('#hp-search-form > button.button.action.has-icon.search-button')
        .wait('#content > article > div.search-results > ul > li:nth-child(1) > p.search-result-url > a')
        // .evaluate(() => document.querySelector('ul.search-results-list li:first-child p.search-result-url a').href)
        .evaluate(() => document.querySelector('#content > article > div.search-results > ul > li:nth-child(1) > p.search-result-url > a').href)
        .end()
        // .then(response => advice.push(response))
        .then(console.log)
        .catch(err => console.log('search failed:',err))
    // return advice;
}

const getAdvice2 = async (keyword) => {
    try {
        // keywords.forEach(async (keyword) => {
            const {data} = await axios.get(`https://developer.mozilla.org/en-US/search?q=${keyword.split(' ').join('+')}`);
            const $ = cheerio.load(data);
            const advice = [];
            // console.log($('.search-result-url > a'));
            // $('.search-result-url > a').each((_idx,element) => {
            console.log(`https://developer.mozilla.org/en-US/search?q=${keyword.split(' ').join('+')}`)
            console.log($('a').length)
            $('a').each((_idx,element) => {
                console.log($(element).text())
                advice.push($(element).text())
            });
            // $('.search-result-url').each((_idx,element) => advice.push($(element).text()));
            // console.log(help);
            // if (help.length !== 0){
            //     // advice.push(help)
            // }
        // })
        return advice;
    } catch (error) {
        throw error;
    }
};

// // export default getAdvice;

// getAdvice2('ruby')
//     .then(data => console.log(data));

getAdvice('ruby');


// const getPostTitles = async () => {
// 	try {
// 		const { data } = await axios.get(
// 			'https://old.reddit.com/r/programming/'
// 		);
// 		const $ = cheerio.load(data);
// 		const postTitles = [];

// 		$('div > p.title > a').each((_idx, el) => {
// 			const postTitle = $(el).text()
// 			postTitles.push(postTitle)
// 		});

// 		return postTitles;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// getPostTitles()
// .then((postTitles) => console.log(postTitles));