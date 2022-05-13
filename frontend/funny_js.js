const addCurry = (a) => {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
console.log(addCurry(2)(3)(5)) // 10




!![]       // -> true
[] == true // -> false



        (![] + [])[+[]] +
    (![] + [])[+!+[]] +
    ([![]] + [][[]])[+!+[] + [+[]]] +
    (![] + [])[!+[] + !+[]];
// -> 'fail'



[] == ![]; // -> true


"foo" + +"bar"; // -> 'fooNaN'


"b" + "a" + +"a" + "a"; // -> 'baNaNa'

[
    {
        title: “keys”,
    codebody: “let veggies = \“\”; \nfor(const x of fruits.keys()) { \nveggies += x; \n }“,
textdetails: “List all keys”,
tags: [“Javascript”, “random”],
    resources: [
        {
            link: “https://www.w3schools.com/js/js_object_maps.asp”,
                title: “JavaScript Maps”
        },
        {
            link: “https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys”,
                title: “Object.keys()”
        },
        {
            link: “https://stackoverflow.com/questions/8763125/get-array-of-objects-keys”,
                title: “Get array of object’s keys - javascript - Stack Overflow”
                }
    ]
        },
{
    title: “keys”,
    codebody: “Math.random()“,
    textdetails: “will always be a number less than 1 “,
    tags: [“Javascript”, “random”],
        resources: [
            {
                link: “https://www.w3schools.com/js/js_object_maps.asp”,
                    title: “js object maps”
            },
            {
                link: “https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random”,
                    title: “Math.random()”
            },
            {
                link: “https://www.geeksforgeeks.org/javascript-math-random-method”,
                    title: “JavaScript Math random() Method - GeeksforGeeks”
                }
            ]
        },
{
    title: “AJAX - XMLHttpRequest “,
    codebody: “// !![]       // -> true\n// [] == true // -> false”,
    textdetails: “Sometimes async = false are used for quick testing.You will also find synchronous requests in older JavaScript code.“,
    tags: [“Javascript”, “AJAX”],
        resources: [
            {
                link: “https://github.com/denysdovhan/wtfjs”,
                    title: “funny ”
            },
            {
                link: “https://www.tutorialspoint.com/ajax/what_is_xmlhttprequest.htm”,
                    title: “AJAX - XMLHttpRequest”
                },
            ]
        },
{
    title: “allEqual”,
    codebody: “const allEqual = arr => arr.every(val => val === arr[0]);“,
    textdetails: “This snippet checks whether all elements of the array are equal.“,
    tags: [“Javascript”, “Equality”],
        resources: [
            {
                link: “https://betterprogramming.pub/127-helpful-javascript-snippets-you-can-learn-in-30-seconds-or-less-part-1-of-6-bc2bc890dfe5”,
                    title: “allEqual”
            },
            {
                link: “https://morioh.com/p/a76bc7d72226”,
                    title: “127 Useful JavaScript Snippets You Can Understand in 30 Seconds”
            },
        ]
},
{
    title: “Recursion & Stack Example”,
    codebody: “def get_numbers(list, index = 0, taken = []) \nreturn[taken] if index == list.size\nget_numbers(list, index + 1, taken) +\nget_numbers(list, index + 1, taken + [list[index]]) \nend\nget_numbers([1, 2, 3])“,
    textdetails: “Sometimes async = false are used for quick testing.You will also find synchronous requests in older JavaScript code.“,
    tags: [“Ruby”, “Recursion”, “Stack”],
        resources: [
            {
                link: “https://www.rubyguides.com/2019/02/ruby-code-examples/”,
                    title: “Recursion & Stack Example”
                },
{
    link: “https://www.geeksforgeeks.org/recursion-in-ruby/”,
    title: “Recursion in Ruby”
},
            ]
        },
{
    title: “Recursion & Stack Example”,
    codebody: “def get_numbers(list, index = 0, taken = []) \nreturn[taken] if index == list.size\nget_numbers(list, index + 1, taken) +\nget_numbers(list, index + 1, taken + [list[index]]) \nend\nget_numbers([1, 2, 3])“,
    textdetails: “Sometimes async = false are used for quick testing.You will also find synchronous requests in older JavaScript code.“,
    tags: [“Ruby”, “Recursion”, “Stack”],
        resources: [
            {
                link: “https://www.rubyguides.com/2019/02/ruby-code-examples/”,
                    title: “Recursion & Stack Example”
                },
{
    link: “https://www.geeksforgeeks.org/recursion-in-ruby/”,
    title: “Recursion in Ruby”
},
            ]
        },
{
    title: ”  Lists 40 prime numbers”,
    codebody: “main(c){ if (c < 41) printf(\“\% d\n\“\, 41 + --c * c + c), main(c + 2); }“,
    textdetails: ”  Euler first noticed(in 1772) that the quadratic polynomial\nP(n) = n2 + n + 41\nis prime for all natural numbers less than 40.“,
    tags: [“C”, “Math”],
        resources: [
            {
                link: “http://www.csc.villanova.edu/~tway/coolc/oneliners/41prime.c”,
                    title: “40 prime numbers”
            },
            {
                link: “https://www3.ntu.edu.sg/home/ehchua/programming/cpp/c1_Basics.html”,
                    title: “C Programming Language Basics”
            },
        ]
},
{
    title: “Add a Title Tooltip”,
    codebody: “<span title=\“ See, this is the tooltip. :) \“>Move your mouse over me!</span>“,
    textdetails: ”  Euler first noticed(in 1772) that the quadratic polynomial\nP(n) = n2 + n + 41\nis prime for all natural numbers less than 40.“,
    tags: [“HTML”, “Hover”],
        resources: [
            {
                link: “https://www.makeuseof.com/tag/7-cool-html-effects-that-anyone-can-add-to-their-website-nb/”,
                    title: “8 Cool HTML Effects Anyone Can Add to Their Websites”
            },
            {
                link: “https://stackoverflow.com/questions/1055581/how-do-i-add-a-tool-tip-to-a-span-element”,
                    title: “How do I add a tool tip to a span element?”
            },
        ]
},
{
    title: “ACustom Text Selection”,
    codebody: “::selection { background: #E2EAE2; } \n:: -moz - selection { background: #E2EAE2; } \n:: -webkit - selection { background: #E2EAE2; }“,
    textdetails: “Some newer web browsers will allow you to define the highlight color on your webpage.This is set to light blue by default, but you can setup any color value which tickles your fancy.This snippet includes the typical::selection target along with vendor prefixes for Webkit and Mozilla.“,
    tags: [“CSS”, “Highlight”],
        resources: [
            {
                link: “https://www.hongkiat.com/blog/css-snippets-for-designers/”,
                    title: “50 Useful CSS Snippets Every Designer Should Have”
            },
            {
                link: “https://developer.mozilla.org/en-US/docs/Web/CSS/::selection”,
                    title: “CSS Selection”
            },
        ]
},
{
    title: “Regular Expression”,
    codebody: “type = [/[aeiou]/, /[^aeiou]/].cycle”,
    textdetails: “We use the cycle method so we can keep switching between the VOWEL regex & the NON - VOWEL regex.“,
    tags: [“Ruby”, “Regex”],
        resources: [
            {
                link: “https://www.rubyguides.com/2019/02/ruby-code-examples/”,
                    title: “Ruby Code Examples”
            },
            {
                link: “https://www.codes-finder.com/ruby-power-in-ruby-code-example/”,
                    title: “Ruby Power In Ruby Code Example”
            },
        ]
},
{
    title: “Regular Expression”,
    codebody: “def longest_repetition(string) \nmax = string\n.chars\n.chunk(&: itself) \n.map(&: last) \n.max_by(&: size) \nmax ? [max[0], max.size] : [\“\”, 0]\nend”,
    textdetails: “this code is formatted to maximize readability”,
    tags: [“Ruby”, “Symbol”],
        resources: [
            {
                link: “https://www.rubyguides.com/2019/02/ruby-code-examples/”,
                    title: “Ruby Code Examples”
            },
            {
                link: “https://www.codes-finder.com/ruby-rails-upper-code-example/”,
                    title: “Ruby Rails Upper Code Example”
            },
        ]
},
{
    title: “With Index”,
    codebody: “def reverse_alternate(string) \nstring.gsub(/[^\s]+/).with_index { | w, idx | idx.even ? ? w : w.reverse } \nend”,
    textdetails: “We combine with_index & even ? to find if we have to reverse the current word\nGsub without a block returns an Enumerator object, which allows you to chain it with other methods”,
    tags: [“Ruby”, “even ?“],
        resources: [
            {
                link: “https://www.rubyguides.com/2019/02/ruby-code-examples/”,
                    title: “With Index Examples”
            },
            {
                link: “https://www.rubyguides.com/category/programming/page/10/”,
                    title: “Category Archives for Programming”
            },
        ]
},
{
    title: “Each with Object”,
    codebody: “def clean_string(str) \nstr\n.chars\n.each_with_object([]) { | ch, obj | ch == \“#\” ?obj.pop : obj << ch } \n.join\nend”,
    textdetails: “each_with_object takes an argument, which is the object we want to start with.This argument becomes the 2nd block parameter.“,
    tags: [“Ruby”, “Object”],
        resources: [
            {
                link: “https://www.rubyguides.com/2019/02/ruby-code-examples/”,
                    title: “Each With Object Example”
            },
            {
                link: “https://www.codes-finder.com/ruby-power-in-ruby-code-example/”,
                    title: “Ruby Power In Ruby Code Example”
            },
        ]
},
{
    title: “Each with Object”,
    codebody: “function sendAuthorizedApiRequest(requestDetails) { \ncurrentApiRequest = requestDetails; \nif(isAuthorized) { \ncurrentApiRequest = {}; \n } else { \nGoogleAuth.signIn(); \n } \n }“,
    textdetails: “make API request gapi.client.request(requestDetails)“,
    tags: [“Ruby”, “Oauth”],
        resources: [
            {
                link: “https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow”,
                    title: “Redirect to Google’s OAuth 2.0 server”
            },
            {
                link: “https://stackoverflow.com/questions/68236125/google-oauth-google-fit”,
                    title: “Ruby Power In Ruby Code Example”
            },
        ]
},
    ]