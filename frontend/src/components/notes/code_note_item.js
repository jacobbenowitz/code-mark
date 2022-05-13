import React from "react";
import { Link } from "react-router-dom";
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import moment from 'moment';

export default class CodeNoteItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="code-note-item">
        <div className="note-item-top">
          {this.props.comments ? (
            <div className="comment-count">
              <i class="fa-solid fa-comments"></i>
              <span>{this.props.comments?.length}</span>
            </div>
          ) : ""}
          <Link to={`/notes/${this.props.id}`} className="show-link-wrapper">
            <div className="view-link">View
              <i className="fa-solid fa-arrow-right"></i></div>
          </Link>
        </div>
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
            <div className="updated-at">
              <span>{moment(this.props.createdAt).fromNow()}</span>
            </div>
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