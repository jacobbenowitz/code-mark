import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import React from 'react';
import { getLanguage } from '../../util/webscrap_util';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { EditorView } from 'codemirror';

const CodeCommentReadOnly = props => {
  const language = getLanguage(props.codeSnippet);
  const extensions = {
    'JavaScript': javascript({ jsx: true }),
    'HTML': html(),
    'CSS': css(),
    'C++': cpp(),
  }
  const fixedHeightEditor = EditorView.theme({
    "&": { 'max-height': "200px" },
    ".cm-scroller": { 'overflow': "auto" }
  })
  return (
    <CodeMirror
      readOnly={true}
      value={props.codeSnippet}
      width='100%'
      theme='dark'
      extensions={[
        extensions[props.language] ? extensions[props.language] : javascript({ jsx: true }), EditorView.lineWrapping, fixedHeightEditor
      ]}
    />
  );
}
export default CodeCommentReadOnly;