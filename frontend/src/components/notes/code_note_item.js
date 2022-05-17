import React from "react";
import { Link, Redirect } from "react-router-dom";
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const CodeNoteItem = props => (
  // <div className="code-note-item"
  //   onClick={<Redirect to={`/notes/${props.id}`} />}>
  <div className="code-note-item"
    onClick={<Redirect to={`/notes/${props.id}`} />}>
    <div className="note-item-top">
      <div className="comment-count">
        <i class="fa-solid fa-comments"></i>
        <span>{props.comments?.length || 0}</span>
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
      <div className="updated-at-and-username">
        <Link className="code-note-username" to={`/users/${props.userId}`}>
          @{props?.username}
        </Link>
        <span>{moment(props?.createdAt).fromNow()}</span>
      </div>
      <Link className="code-note-title" to={`/notes/${props.id}`}>
        {props?.title}
      </Link>
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