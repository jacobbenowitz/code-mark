import React from "react";
import CodeCommentReadOnlyMini from '../code_editor/code_comment_readonly_mini'

const CommentModal = ({
  commentModal,
  toggleCommentModal,
  selectedText,
  commentOnSelection,
  hideCommentModal }) => {
  
  let commentButton, codePreview, prompt, commentModalItem;
  
  if (!hideCommentModal) {
    if (selectedText) {
      commentButton = (
        <div className='icon-button'
          onClick={commentOnSelection}>
          <span>Comment</span>
          <i className="fa-solid fa-arrow-right" />
        </div>
      )
      codePreview = (
        <CodeCommentReadOnlyMini
          codeSnippet={selectedText}
        />
      )
      prompt = (
        <span>Comment on this selection:</span>
      )
    } else {
      prompt = (
        <span>Highlight code to comment on it directly</span>
      )
    }

    commentModalItem = (
      <div id='comment-highlight-text' className={commentModal ?
        'modal-expanded' : 'modal-compact'}>
        <div className='arrow-modal'
          onClick={toggleCommentModal}
        >
          {commentModal ? (
            <i className="fa-solid fa-chevron-right fa-xl" />
          ) : (
            <i className="fa-solid fa-chevron-left fa-xl" />
          )}
        </div>
        <div className='modal-main'>
          <div className='comment-selection-title'>
            <i className="fa-solid fa-comment" />
            { prompt }
          </div>
          { codePreview }
          { commentButton }
        </div>
      </div>
    )
  }
  
  return (
  <>
    {commentModalItem}
  </>
  )
}

export default CommentModal;