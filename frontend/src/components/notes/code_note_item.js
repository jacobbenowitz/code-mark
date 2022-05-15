import React from "react";
import { Link } from "react-router-dom";
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import moment from 'moment';

const CodeNoteItem = props => (
  <div className="code-note-item">
    <div className="note-item-top">
      <div className="comment-count">
        <i class="fa-solid fa-comments"></i>
        <span>{props.comments?.length}</span>
      </div>
      <Link to={`/notes/${props.id}`} className="show-link-wrapper">
        <div className="view-link">View
          <i className="fa-solid fa-arrow-right"></i></div>
      </Link>
    </div>
    <div className="code-note-tags">
      {props.tags?.map(tag =>
        <div className="note-tag-mini">{tag}</div>)}
    </div>
    <div className="code-note-text">
      <span className="code-note-title">
        {props?.title}
      </span>
      <div className="updated-at">
        <span>{moment(props?.createdAt).fromNow()}</span>
      </div>
      <span className="code-note-body">
        {props?.textDetails}
      </span>
    </div>
    <div className="code-note-preview">
      <CodeEditorReadOnly
        codeBody={props.codeBody} />
    </div>
  </div>
);

export default CodeNoteItem;