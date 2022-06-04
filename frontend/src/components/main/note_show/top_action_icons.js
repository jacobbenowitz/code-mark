import React from "react";

const NoteTopActionIcons = ({ history, currentUser,
  note, toggleDeleteModal, toggleEditModal, isCurrentUser }) => {
  
  let editButton, deleteButton;

  if (isCurrentUser) {
    editButton = (
      <div className='edit-note icon-button'
        onClick={() => toggleEditModal()}>
        <i className="fa-solid fa-pen-to-square fa-lg"></i>
        <span>
          Edit
        </span>
      </div>
    )

    deleteButton = (
      <div className='delete-note icon-button'
        onClick={() => toggleDeleteModal()}>
        <i className="fa-solid fa-trash fa-lg"></i>
        <span>
          Delete
        </span>
      </div>
    )
  }
  
  return (
    <div className='note-show-top-icons'>
      <div className='back-page icon-button'
        onClick={() => history.goBack()}>
        <i className="fa-solid fa-arrow-left fa-lg"></i>
        <span>
          Back
        </span>
      </div>
      { editButton }
      { deleteButton }
    </div>
  )
}

export default NoteTopActionIcons;