import { getGoogleAdvice, getAdvice } from './webscraping.js';

function getResources (keywords) {
    // var keywords = code.split(' ');
    // keywords = [...new Set(keywords)];
    var resources = [];
    keywords.forEach(keyword => {
        // resources.push(keyword);
        resources.push(getGoogleAdvice(keyword)
            .then(data => {
                // console.log(typeof data);
                return data;
            }));
        resources.push(getAdvice(keyword)
            .then(data => {
                // console.log(data);
                return data;
            }));
    });
    // console.log(resources);
    return resources;
}

function getNightmareResources (code) {
    var keywords = code.split(' ');
    keywords = [...new Set(keywords)];
    var resources = [];
    // console.log(keywords);
    keywords.forEach(keyword => {
        resources.push(getAdvice(keyword)
            .then(data => {
                // console.log(data);
                return data;
            }))
    });
    return resources;
}

export async function getStuff(words){
    let response = await Promise.all(getResources(words));
    // console.log(response);
    return response.flat().filter(ele => ele !== undefined);
}

export async function getNightmareStuff(words){
    let data = await Promise.all(getNightmareResources(words));
    // console.log(data);
    return data;
}

const ignore = ['(',')','{','}',';'];

export function getKeywords(codebody){
    // let words = codebody.replace(/[\W_]+/g," ");
    let words = codebody.split(" ");
    words.filter(word => !ignore.includes(word));
    words = [...new Set(words)];
    return words.filter(word => word.length > 1);
}

// let words = 'ruby java onclick() onchange() componentdidmount()';

// // let words = 'ruby java onclick() onchange()';
// // let res1 = await getNightmareStuff(words);

// let res2 = await getStuff(words);

// // console.log(res1);

// console.log(res2.filter(ele => ele !== undefined));