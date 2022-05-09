import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

export default function codeEditor() {
  return (
    <CodeMirror
      value="Save a new note..."
      height="200px"
      theme='dark'
      extensions={[javascript({ jsx: true })]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}
    />
  );
}