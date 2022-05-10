const axios = require('axios');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');

axios
    .get('https://developer.mozilla.org/en-US/docs/Web/CSS#key_resources')
    .then(response => {
        let $ = cheerio.load(response.data);
        $('dd').each((_idx,element) => console.log($(element).text().trim()))
    })
    .catch(error => console.log(error));

const getAdvice = (keywords) => {
    var advice = [];
    const nightmare = Nightmare({ show: true });
    keywords.forEach(keyword => {
        nightmare
            .goto('https://developer.mozilla.org/en-US/')
            .type('#hp-search-q',keyword)
            .click('.button.action.has-icon.search-button')
            .wait('ul.search-results-list li:first-child p.search-result-url a')
            .evaluate(() => document.querySelector('ul.search-results-list li:first-child p.search-result-url a').href)
            .end()
            .then(response => advice.push(response))
            .catch(err => console.log('search failed:',err))
    })
    return advice;
}

const getAdvice2 = async (keywords) => {
    try {
        const advice = [];
        keywords.forEach(async (keyword) => {
            const {data} = await axios.get(`https://developer.mozilla.org/en-US/search?q=${keyword.split(' ').join('+')}`);
            const $ = cheerio.load(data);
            advice.push($('ul.search-results-list li:first-child p.search-result-url a'))
        })
        return advice;
    } catch (error) {
        throw error;
    }
};

// export default getAdvice;


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