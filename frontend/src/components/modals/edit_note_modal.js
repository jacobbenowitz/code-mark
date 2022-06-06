import React from "react";
import EditNote from '../code_editor/edit_note';

const EditNoteModal = ({ bodyHeight, bodyWidth, getLanguage, note, updateNote, currentUser, noteId, toggleCommentModalVisibility, isMobile }) => (
  <div id='edit-note-container' className="modal-off"
    style={{ 'height': bodyHeight }}>
    <div className='modal-wrapper'>
      <EditNote
        getLanguage={getLanguage}
        note={note}
        updateNote={updateNote}
        currentUser={currentUser}
        noteId={noteId}
        toggleCommentModalVisibility={toggleCommentModalVisibility}
        isMobile={isMobile}
      />
    </div>
  </div>
)

export default EditNoteModal;