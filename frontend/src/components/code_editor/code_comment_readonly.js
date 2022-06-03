import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import React from 'react';
import { getLanguage } from '../../util/webscrap_util';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/basic-setup';

const CodeCommentReadOnly = props => {
  const language = getLanguage(props.codeSnippet);
  const extensions = {
    'JavaScript': javascript({ jsx: true }),
    'HTML': html(),
    'CSS': css(),
    'C++': cpp(),
  }
  
  return (
    <CodeMirror
      className="comment-code"
      readOnly={true}
      value={props.codeSnippet || 'Optional code snippet'}
      width='100%'
      theme='dark'
      extensions={[
        extensions[language] ? extensions[language] : html(),
        EditorView.lineWrapping
      ]}
    />
  );
}
export default CodeCommentReadOnly;