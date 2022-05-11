import React from "react";
let hljs = require('highlight.js');

export default class HighlightTest extends React.Component {
    render(){
        return(
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css"></link>
                <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
                <script>
                    hljs.highlightAll();
                    html = hljs.highlightAuto('<h1>Hello World!</h1>').value
                </script>
                <script>
                    document.addEventListener('DOMContentLoaded', (event) => {
                        document.querySelectorAll('pre code').forEach((el) => {
                            hljs.highlightElement(el)
                        })
                    })
                </script>
                <pre><code className="javascript">
                    document.addEventListener('DOMContentLoaded', (event) => {
                        document.querySelectorAll('pre code').forEach((el) => {
                            hljs.highlightElement(el)
                        })
                    })
                </code></pre>
            </div>
            )
        }
}