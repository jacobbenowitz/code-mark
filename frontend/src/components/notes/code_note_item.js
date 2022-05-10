import React from "react";
import CodeEditorReadOnly from '../code_editor/code_editor_readonly'

export default class CodeNoteItem extends React.Component {
  render() {
    return (
      <div className="code-note-item">
        <div className="code-note-tags">
        </div>

        <div className="code-note-text">
          <span className="code-note-title">
            {this.props.title}
          </span>
          <span className="code-note-body">
            {this.props.textDetails}
          </span>
        </div>
        <div className="code-note-preview">
          <CodeEditorReadOnly
            codeBody={this.props.codeBody} />
        </div>
      </div>
    )
  }
}