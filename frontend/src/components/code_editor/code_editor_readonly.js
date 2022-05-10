import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import React from 'react';

const CodeEditorReadOnly = props => {
  return (
    <CodeMirror
      readOnly={true}
      value={props.codeBody}
      height="200px"
      width='100%'
      theme='dark'
      extensions={[javascript({ jsx: true })]}
    />
  );
}
export default CodeEditorReadOnly;