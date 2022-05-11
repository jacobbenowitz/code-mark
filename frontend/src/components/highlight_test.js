import React from "react";

export default class HighlightTest extends React.Component {
    render(){
        return(
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css"></link>
                <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
                <script>hljs.highlightAll();</script>
                <pre><code class="language-html">
                    document.addEventListener('DOMContentLoaded', (event) => {
                        document.querySelectorAll('pre code').forEach((el) => {
                            // hljs.highlightElement(el)
                        })
                    })
                </code></pre>
            </div>
            )
        }
}