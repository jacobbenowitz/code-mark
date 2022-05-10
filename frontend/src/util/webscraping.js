const axios = require('axios');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');

const getAdvice = (keyword) => {
    var advice;
    // const nightmare = Nightmare({ show: true });
    const nightmare = Nightmare();
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
        // .then(response => advice = response)
        .catch(err => console.log('search failed:',err))
    return advice;
}

const getAdvice2 = async (keyword) => {
    try {
        // keywords.forEach(async (keyword) => {
            const {data} = await axios.get(`https://developer.mozilla.org/en-US/search?q=${keyword.split(' ').join('+')}`);
            // const {data} = await axios.get(`https://www.google.com/search?q=${keyword.split(' ').join('+')}`);
            const $ = cheerio.load(data);
            const advice = [];
            // console.log($('.search-result-url > a'));
            // $('.search-result-url > a').each((_idx,element) => {
            console.log(`https://developer.mozilla.org/en-US/search?q=${keyword.split(' ').join('+')}`)
            console.log($('p.search-result-url ').length)
            // $('main > article > div.search-results > ul > li:nth-child(1) > p.search-result-url > a').each((idx,element) => {
            $('p.search-result-url ').each((idx,element) => {
            // $(".yuRUbf > a").each((idx,element) => {
                console.log($(element).attr('href'))
                advice.push($(element).attr('href'));
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

const AXIOS_OPTIONS = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    },
};

export const getGoogleAdvice = (search) => {
    const encodedString = encodeURI(search);
    console.log(`https://www.google.com/search?q=${encodedString}&hl=en&gl=us`);
    return axios
        .get(`https://www.google.com/search?q=${encodedString}&hl=en&gl=us`, AXIOS_OPTIONS)
        .then(({data}) => {
            let $ = cheerio.load(data);
            const links = [];
            const titles = [];

            $(".yuRUbf > a").each((idx,element) => {
                links[idx] = $(element).attr('href');
            });

            $(".yuRUbf > a > h3").each((idx,element) => {
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
            return result.slice(0,3);

        })
}

// // export default getAdvice;

// getAdvice2('ruby')
//     .then(data => console.log(data));

// getAdvice('ruby');

// getGoogleAdvice('onclick()').then(data => console.log(data))


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