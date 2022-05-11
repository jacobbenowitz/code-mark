import React from "react";
const hljs = require('highlight.js');

export default class HighlightTest extends React.Component {
    render(){
        const code_test = hljs.highlightAuto("var date = Date.now();",['Ruby','C','JavaScript','CSS','HTML']);
        return(
            // <pre><code>
            //     "document.addEventListener('DOMContentLoaded', (event) =&gt; {
            //         document.querySelectorAll('pre code').forEach((el) => {
            //         hljs.highlightElement(el)
            //         })
            //     })"
            // </code></pre>
            <div>
                <pre><code>
                </code></pre>
                    {code_test.value}
            </div>
            // <span id='test'>
            // </span>
        )
    }
}