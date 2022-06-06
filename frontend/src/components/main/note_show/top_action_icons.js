import React from "react";
import NoteShowActionIconsLoaderDesktop from "../../content_loaders/desktop/note_show_action_icons_loader_desktop";


const NoteTopActionIcons = ({ history, isMobile, status,
  note, toggleDeleteModal, toggleEditModal, isCurrentUser }) => {
  
  let editButton, deleteButton, noteActionIcons;

  if (status == "DONE") {
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
    noteActionIcons = (
      <>
        <div className='back-page icon-button'
          onClick={() => history.goBack()}>
          <i className="fa-solid fa-arrow-left fa-lg"></i>
          <span>
            Back
          </span>
        </div>
        { editButton }
        { deleteButton }
      </>
    )
  } else {
    noteActionIcons = (
      <div className='note-show-top-icons'>
        <NoteShowActionIconsLoaderDesktop />
      </div>
    )
  }
  
  return (
    <div className='note-show-top-icons'>
      { noteActionIcons }
    </div>
  )
}

export default NoteTopActionIcons;