import React from "react";

const DeleteNoteModal = ({deleteNote, bodyHeight, toggleDeleteModal}) => {
  return (
    <div id='confirm-modal-container'
      className='modal-off'
      style={{ 'height': bodyHeight }}
    >
      <div className='modal-wrapper'>
        <div className='cancel-modal'>
          <span>Are you sure you want to delete this note?</span>
          <div className='modal-buttons'>
            <div className='delete-note icon-button'
              onClick={deleteNote}>
              <i className="fa-solid fa-trash fa-lg"></i>
              <span>
                Delete
              </span>
            </div>
            <div className='cancel icon-button'
              onClick={toggleDeleteModal}>
              <i className="fa-solid fa-ban fa-lg"></i>
              <span>
                Cancel
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteNoteModal;