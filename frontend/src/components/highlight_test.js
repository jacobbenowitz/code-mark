import React from "react";
const hljs = require('highlight.js');

export default class HighlightTest extends React.Component {
    render(){
        const code_test = hljs.highlightAuto( "import Head from next/head import CountriesTable from ../components/CountriesTable/CountriesTable import Layout from ../components/Layouts/layout; import SearchInput from ../components/SearchInput/SearchInput; import styles from ../styles/Home.module.css; export default function HomePage({ countries }) { return ( <Layout> <div className={styles.counts}>found {countries.length} countries</div> <SearchInput placeholder= Search for country  /> <CountriesTable countries={countries} /> </Layout> ); } export const getStaticProps = async () => { const res = await fetch( https://restcountries.com/v3.1/region/asia ); const countries = await res.json(); return { props: { countries, }, }; };",['Ruby','C','JavaScript','CSS','HTML']);
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
                    {code_test.language}
            </div>
            // <span id='test'>
            // </span>
        )
    }
}