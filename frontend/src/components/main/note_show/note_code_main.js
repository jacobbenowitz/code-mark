import React from "react";
import NoteShowEditorLoader from '../../code_editor/code_show_editor_loader'
import CodeEditorNoteShow from '../../code_editor/code_editor_note_show_readonly';
import LikeNoteIcon from '../../notes/like_note_icon';


const NoteShowCodeAndDetails = ({
  note,
  addNoteLike,
  removeNoteLike,
  currentUser,
  noteId,
  toggleExportModal,

  }) => {
  return (
    <> 
      <div className='code-note-body' id='code-note-view'>
        {note ? (
          <>
            <div className='icons-wrapper'>
              <div className='icons-left-col'>
                <LikeNoteIcon
                  addNoteLike={addNoteLike}
                  removeNoteLike={removeNoteLike}
                  currentUserId={currentUser.id}
                  noteId={noteId}
                  likes={note.likes}
                />
              </div>

              <div className='icons-right-col'>
                <div className='hidden' id='highlight-instructions'>
                  <span>Highlight any section of the CodeMark and right click to comment!</span>
                </div>
                <div id='export-img-icon' className='note-icon'
                  onClick={toggleExportModal}
                  title="export a screenshot">
                  <i className="fa-solid fa-camera-retro fa-lg"></i>
                </div>
                <div className='note-icon info-icon'
                      id='highlight-comment-code-icon'>
                  <i className="fa-solid fa-circle-question fa-lg"></i>
                </div>
              </div>
            </div>

            <CodeEditorNoteShow
              codeBody={note.codebody}
              language={note.language}
            />
          </>
        ) : <NoteShowEditorLoader />}
      </div>
              {
      note?.textdetails ? (
        <div className='note-textDetails'>
          <span className='textDetails-show'>
            {note.textdetails}
          </span>
        </div>
      ) : ''
    }
    </>
  )
}

export default NoteShowCodeAndDetails;