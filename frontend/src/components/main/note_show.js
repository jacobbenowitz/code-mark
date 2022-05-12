import React from 'react';
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import NoteShowEditorLoader from '../code_editor/code_show_editor_loader';
import EditNote from '../code_editor/edit_note';
import CommentFormContainer from '../notes/comments/comment_form_container';
import { selectNoteComments } from "../../util/selectors";
import CommentItem from '../notes/comments/comment_item';
import Tags from '../tags/tags';

export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: undefined,
      comments: []
    }
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentWillMount() {
    this.props.fetchNote(this.props.noteId);
    this.props.fetchNoteComments(this.props.noteId);
  }

  componentWillReceiveProps(nextProps) {
    debugger
    this.setState({
      note: nextProps.note,
      comments: nextProps.comments
    })
  }

  deleteNote() {
    this.props.removeNote(this.props.noteId).then(() => {
      this.props.history.push('/home')
    })
  }

  toggleEditModal() {
    const editNoteModal = document.getElementById('edit-note-container');
    if (editNoteModal.className === "modal-off") {
      editNoteModal.className = "modal-on"
    } else {
      editNoteModal.className = "modal-off"
    }
  }

  toggleDeleteModal() {
    const deleteModal = document.getElementById('confirm-modal-container');
    if (deleteModal.className === "modal-off") {
      deleteModal.className = "modal-on";
    } else {
      deleteModal.className = "modal-off";
    }
  }

  render() {
    const { note, currentUser, updateNote, noteId } = this.props;
    debugger
    return note ? (
      <>
        <div id='confirm-modal-container' className='modal-off' >
          <div className='modal-wrapper'>
            <div className='cancel-modal'>
              <span>Are you sure you want to delete this note?</span>
              <div className='modal-buttons'>
                <div className='delete-note icon-button'
                  onClick={() => this.deleteNote()}>
                  <i className="fa-solid fa-trash fa-lg"></i>
                  <span>
                    Delete
                  </span>
                </div>
                <div className='cancel icon-button'
                  onClick={() => this.toggleDeleteModal()}>
                  <i className="fa-solid fa-ban fa-lg"></i>
                  <span>
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='edit-note-container' className="modal-off">
          <div className='modal-wrapper'>
            <EditNote note={note} updateNote={updateNote}
              currentUser={currentUser} noteId={noteId} />
          </div>
        </div>
        <div className='note-show-container center-span-7'>
          <div className='note-show-top-icons'>
            <div className='back-page icon-button'
              onClick={() => this.props.history.push('/home')}>
              <i className="fa-solid fa-arrow-left fa-lg"></i>
              <span>
                Back
              </span>
            </div>
            <div className='edit-note icon-button'
              onClick={() => this.toggleEditModal()}>
              <i className="fa-solid fa-pen-to-square fa-lg"></i>
              <span>
                Edit
              </span>
            </div>
            <div className='delete-note icon-button'
              onClick={() => this.toggleDeleteModal()}>
              <i className="fa-solid fa-trash fa-lg"></i>
              <span>
                Delete
              </span>
            </div>
          </div>

          <div className='note-show-main'>
            <div className='note-show-title'>
              <h1>{note.title}</h1>
            </div>

            <div className='code-note-body'>
              <CodeEditorReadOnly
                codeBody={note.codebody}
              />
            </div>

            <div className='note-tags-wrapper'>
              <Tags note={this.state.note}
                updateNote={this.props.updateNote}
              />
            </div>

            <div className='note-textDetails'>
              <span className='textDetails-show'>
                {note.textdetails}
              </span>
            </div>
          </div>

          <div className='note-resources'>
            <div className='resources-title'>
              <h4>Resources</h4>
            </div>
            <div className='resources-list'>
              {/* resourceItem components */}
            </div>
          </div>

          <div className='note-comments'>
            <div className='comments-title'>
              <h4>Comments</h4>
            </div>
            <div className='comments-list'>
              <CommentFormContainer />
              {this.state.comments.map(comment => {
                return <CommentItem
                  key={comment._id} comment={comment} />
              })}
            </div>
          </div>
        </div>
      </>
    ) : (
      <NoteShowEditorLoader />
    )

  }
}
