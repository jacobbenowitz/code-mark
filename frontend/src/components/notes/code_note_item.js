import React from "react";
import { Link, Redirect } from "react-router-dom";
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import moment from 'moment';
import CodeNotePlaceholder from "./code_note_placeholders/code_note_item_placeholder";
import CodeBodyPlaceholder from "./code_note_placeholders/codeBody_placeholder";
import CodeNoteTextPlaceholder from './code_note_placeholders/code_note_text_placeholder';
import { withRouter } from "react-router-dom";

const CodeNoteItem = props => {

  function preventBubbleLink(e) {
    e.stopPropagation();
    props.history.push(`/users/${props.userId}`);
  }
  
  return (
    <>
      {props.id && props.username && props.userId && props.createdAt && props.codeBody ? (
        <div className="code-note-item" key={props.id}
          onClick={() => props.history.push(`/notes/${props.id}`) }>
          <div className="note-item-top">
            <div className="top-row-details">
              <div className="note-stats">
                <div className="comment-count">
                  <i className="fa-solid fa-comments"></i>
                  <span>{props.comments?.length || 0}</span>
                </div>
                <div className="like-count">
                  <i className="fa-solid fa-heart"></i>
                  <span>{props.likes?.length || 0}</span>
                </div>
              </div>
              <Link to={`/notes/${props.id}`} className="show-link-wrapper">
                <div className="view-link">View
                  <i className="fa-solid fa-arrow-right"></i></div>
              </Link>
            </div>
            
          </div>
          {props.userId && props.createdAt && props?.title ? (
            <div className="code-note-text">
              <div className="updated-at-and-username"
                onClick={preventBubbleLink}>
                <Link className="code-note-username"
                  to={`/users/${props.userId}`}>
                  @{props?.username}
                </Link>
                <span>{moment(props?.createdAt).fromNow()}</span>
              </div>
              <Link className="code-note-title" to={`/notes/${props.id}`}>
                {props?.title}
              </Link>
              <span className="code-note-body">
                {props?.textDetails.length < 260 ? props?.textDetails : `${props?.textDetails.slice(0, 260)}...`}
              </span>
              {props.tags.length ? (
                <div className="code-note-tags">
                  {props.tags?.map((tag, i) =>
                    <div className="note-tag-mini" key={`${i}-tag`}>{tag}</div>)}
                </div>
              ) : ''}
              {props.tags.length ? (
                <div className="spacer-30-h"></div>
              ) : ''}
            </div>
            
          ) : (
            <div className="code-note-text">
              <CodeNoteTextPlaceholder />
            </div>
          )}
          {props.codeBody.length ? (
            <div className="code-note-preview">
              <CodeEditorReadOnly
                codeBody={props.codeBody} />
            </div>
          ) : (
            <CodeBodyPlaceholder />
          )}
        </div>
      ) : (
        <div className="code-note-item">
          <CodeNotePlaceholder />
        </div>
      )}
    </>
  )
}

export default withRouter(CodeNoteItem);