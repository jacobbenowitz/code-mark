import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import React from 'react';

class CodeEditorReadOnly extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CodeMirror
        readOnly={true}
        value={this.props.codeBody}
        height="200px"
        theme='dark'
        extensions={[javascript({ jsx: true })]}
      />
    );
  };
}
export default CodeEditorReadOnly;