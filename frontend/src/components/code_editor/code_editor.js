import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: [javascript({ jsx: true })]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ lang: e.target.value });
  }

  render() {
    return (
      <div>
        <select value={this.state.lang} onChange={this.handleChange}>
          <option value={[javascript({ jsx: true })]} selected>JavaScript</option>
          <option value={[html()]}>HTML</option>
          <option value={[cpp()]}>C++</option>
          <option value={[css()]}>CSS</option>
        </select>
        <CodeMirror
          placeholder={"Save a new note..."}
          height="200px"
          theme='dark'
          extensions={this.state.lang}
        />
      </div>
    );
  }
}

export default CodeEditor;