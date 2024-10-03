import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import React from 'react';
import { getLanguage } from '../../util/webscrap_util';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { EditorView } from 'codemirror';

const CodeCommentReadOnlyMini = props => {
  const language = getLanguage(props.codeSnippet);
  const extensions = {
    'JavaScript': javascript({ jsx: true }),
    'HTML': html(),
    'CSS': css(),
    'C++': cpp(),
  }
  const fixedHeightEditor = EditorView.theme({
    "&": { "max-width": "300px" },
    "&": { "width": "100%" },
    "&": { "max-height": "200px" },
    ".cm-scroller": { "overflow": "auto" },
  })
  return (
    <CodeMirror
      onFocus={props.promptCodeHighlight}
      className="comment-code-mini"
      readOnly={true}
      value={props.codeSnippet}
      theme='dark'
      extensions={[
        extensions[language] ? extensions[language] : javascript({ jsx: true }),
        EditorView.lineWrapping, fixedHeightEditor
      ]}
    />
  );
}
export default CodeCommentReadOnlyMini;