import React from "react";
import { Link } from "react-router-dom";
import CodeEditorReadOnly from '../code_editor/code_editor_readonly'

export default class CodeNoteItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="code-note-item">

        <Link to={`/notes/${this.props.id}`} className="show-link-wrapper">
          <div className="view-link">View note
            <i className="fa-solid fa-arrow-right"></i></div>
        </Link>
        <div className="code-note-tags">
          {this.props.tags.map(tag =>
            <div className="note-tag-mini">{tag}</div>)}
        </div>
        {this.props.title || this.props.textDetails ? (
          <div className="code-note-text">
            {this.props.title ? (
              <span className="code-note-title">
                {this.props.title}
              </span>
            ) : ""}
            {this.props.textDetails ? (
              <span className="code-note-body">
                {this.props.textDetails}
              </span>
            ) : ""}
          </div>
        ) : ""
        }
        <div className="code-note-preview">
          <CodeEditorReadOnly
            codeBody={this.props.codeBody} />
        </div>
      </div>
    )
  }
}