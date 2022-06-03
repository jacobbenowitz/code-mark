// import { getGoogleAdvice, getAdvice } from './webscraping.js';
// import { getGoogleAdvice } from './webscraping.js';
const hljs = require('highlight.js');

export function getLanguage(codebody) {
    const languages = ['Ruby', 'C', 'JavaScript', 'CSS', 'HTML'];
    const code_test = hljs.highlightAuto(codebody, languages);
    return code_test.language;
}

export function getKeywords(codebody) {
    const comment_markers = { 'JavaScript': /(\/\/.*\n)/g, 'HTML': /(<!--.*-->)/g, 'CSS': /(\/\*.*\*\/)/g, 'C': /(\/\/.*\n)/g, 'Ruby': /(#.*\n)/g };
    const comment_replace = { 'JavaScript': '\n', 'HTML': '', 'CSS': '', 'C': '\n', 'Ruby': '\n' };
    const languages = ['Ruby', 'C', 'JavaScript', 'CSS', 'HTML'];
    // let words = codebody.replace(/[\W_]+/g," ");
    const language = hljs.highlightAuto(codebody, languages).language;
    let lines = codebody;
    if (Object.keys(comment_markers).includes(language)) {
        // lines.map(line => line.slice(0,line.indexOf(comment_markers[language])));
        lines = lines.replaceAll(comment_markers[language], comment_replace[language]);
    }
    lines = lines.split('\n')
    let words = lines.join(" ").replaceAll("\"", "'");
    words = words.split(" ");
    words = [...new Set(words)];
    // words = words.filter(word => !ignore.includes(word));
    return words.filter(word => word.length > 1);
    // return words.map(word => code_test.language + ' ' + word);
}

// function getResources(keywords, codebody) {
//     const language = getLanguage(codebody);
//     // var keywords = code.split(' ');
//     // keywords = [...new Set(keywords)];
//     var resources = [];
//     keywords.map(keyword => language + ' ' + keyword);
//     keywords.forEach(keyword => {
//         // resources.push(keyword);
//         resources.push(getAdvice(keyword)
//             .then(data => {
//                 // console.log(typeof data);
//                 return data;
//             }));
//         // resources.push(getAdvice(keyword)
//         //     .then(data => {
//         //         // console.log(data);
//         //         return data;
//         //     }));
//     });
//     // console.log(resources);
//     return resources;
// }

// function getNightmareResources (code) {
//     var keywords = code.split(' ');
//     keywords = [...new Set(keywords)];
//     var resources = [];
//     // console.log(keywords);
//     keywords.forEach(keyword => {
//         resources.push(getAdvice(keyword)
//             .then(data => {
//                 // console.log(data);
//                 return data;
//             }))
//     });
//     return resources;
// }

// export async function getStuff(keywords, codebody) {
//     let response = await Promise.all(getResources(keywords, codebody));
//     // console.log(response);
//     return response.flat().filter(ele => ele !== undefined);
// }

// export async function getNightmareStuff(words){
//     let data = await Promise.all(getNightmareResources(words));
//     // console.log(data);
//     return data;
// }

// const ignore = ['(',')','{','}',';'];

// let words = 'ruby java onclick() onchange() componentdidmount()';

// // let words = 'ruby java onclick() onchange()';
// // let res1 = await getNightmareStuff(words);

// let res2 = await getStuff(words);

// // console.log(res1);

// console.log(res2.filter(ele => ele !== undefined));
// let code = "var x = myFunction(4,3); document.getElementById('demo').innerHTML = x; //asdfasdfsd \n function myFunction(a,b) { return a*b;}"
// let code = "body { \n background-color: lightblue; \n } \n h1 { \n color: white; \n text-align: center; \n} \n p  \n font-family: verdana; \n font-size: 20px; \n}"
// let code = "#include <stdio.h> \nint main() {\nprintf(\"Hello World!\"'); \n return 0; \n}"
// console.log(getKeywords(code));
