import { getGoogleAdvice, getAdvice } from './webscraping.js';

function getResources (code) {
    var keywords = code.split(' ');
    keywords = [...new Set(keywords)];
    var resources = [];
    keywords.forEach(keyword => {
        resources.push(keyword);
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
    return response.flat();
}

export async function getNightmareStuff(words){
    let data = await Promise.all(getNightmareResources(words));
    // console.log(data);
    return data;
}

// let words = 'ruby java onclick() onchange() componentdidmount()';

// // let words = 'ruby java onclick() onchange()';
// // let res1 = await getNightmareStuff(words);

// let res2 = await getStuff(words);

// // console.log(res1);

// console.log(res2.filter(ele => ele !== undefined));