import React from "react";
import NoteShowEditorLoader from '../../code_editor/code_show_editor_loader'
import CodeEditorNoteShow from '../../code_editor/code_editor_note_show_readonly';
import LikeNoteIcon from '../../notes/like_note_icon';
import NoteShowMainLoader from "../../content_loaders/note_show_main_loader";
import NoteShowCodeNoteLoaderMobile from "../../content_loaders/mobile/note_show_code_note_loader_mobile";
import ReactTextareaAutosize from "react-textarea-autosize";


const NoteShowCodeAndDetails = ({
  note,
  isMobile,
  status,
  addNoteLike,
  removeNoteLike,
  currentUser,
  noteId,
  toggleExportModal }) => {
  
  let noteTextDetails, noteShowMain;
  if (status === 'DONE') {
    if (note.textdetails) {
      noteTextDetails = (
        <div className='note-text-details'>
          <ReactTextareaAutosize
            className="textarea-details"
            value={note.textdetails}
          />
        </div>
      )
    }
    noteShowMain = (
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
    )
  } else {
    if (isMobile) {
      noteShowMain = (
        <NoteShowCodeNoteLoaderMobile />
      )
    } else {
    noteShowMain = (
      <NoteShowMainLoader />
    )}
  }
  return (
    <> 
      <div className='code-note-body' id='code-note-view'>
        { noteShowMain }
      </div>
      { noteTextDetails }
    </>
  )
}

export default NoteShowCodeAndDetails;