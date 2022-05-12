import React from 'react';
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import NoteShowEditorLoader from '../code_editor/code_show_editor_loader';
import EditNote from '../code_editor/edit_note';
import CommentFormContainer from '../notes/comments/comment_form_container';
// import { selectNoteComments } from "../../util/selectors";
import { orderNoteComments } from "../../util/selectors";
import CommentItem from '../notes/comments/comment_item';
import Tags from '../tags/tags';
// credit context menu: https://itnext.io/how-to-create-a-custom-right-click-menu-with-javascript-9c368bb58724
// textarea resize: https://stackoverflow.com/questions/20775824/after-clicking-on-selected-text-window-selection-is-not-giving-updated-range
import CommentIndex from '../notes/comments/comment_index';

export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: undefined,
      comments: [],
    }
    this.deleteNote = this.deleteNote.bind(this);
    this.deleteThisComment = this.deleteThisComment.bind(this);
  }

  componentWillMount() {
    this.props.fetchNote(this.props.noteId);
    this.props.fetchNoteComments(this.props.noteId);
  }

  componentWillReceiveProps(nextProps) {
    debugger
    this.setState({
      note: nextProps.note,
      comments: orderNoteComments(nextProps.comments),
      newComment: nextProps.newComment
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

  deleteThisComment(commentId) {
    debugger
    const comments = this.state.comments.filter(comment =>
      comment._id !== commentId
    )
    this.setState({ comments: comments }, () => {
      debugger
      this.props.removeComment(commentId)
    })
  }

  toggleDeleteModal() {
    const deleteModal = document.getElementById('confirm-modal-container');
    if (deleteModal.className === "modal-off") {
      deleteModal.className = "modal-on";
    } else {
      deleteModal.className = "modal-off";
    }
  }


  commentOnSelection(selection) {
    const commentSection = document.getElementById("comments");
    const newSnippetField = document.getElementById("code-snippet-new")
    newSnippetField.focus()
    newSnippetField.value = selection
    debugger
    commentSection.scrollIntoView({ behavior: 'smooth' })
  }



  render() {

    const { note, currentUser, updateNote, noteId } = this.props;

    const contextMenu = document.getElementById("context-menu");
    const scope = document.querySelector("body");

    const normalizePozition = (mouseX, mouseY) => {
      // ? compute what is the mouse position relative to the container element (scope)
      const {
        left: scopeOffsetX,
        top: scopeOffsetY,
      } = scope.getBoundingClientRect();

      const scopeX = mouseX - scopeOffsetX;
      const scopeY = mouseY - scopeOffsetY;

      // ? check if the element will go out of bounds
      const outOfBoundsOnX =
        scopeX + contextMenu.clientWidth > scope.clientWidth;

      const outOfBoundsOnY =
        scopeY + contextMenu.clientHeight > scope.clientHeight;

      let normalizedX = mouseX;
      let normalizedY = mouseY;

      // ? normalzie on X
      if (outOfBoundsOnX) {
        normalizedX =
          scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
      }

      // ? normalize on Y
      if (outOfBoundsOnY) {
        normalizedY =
          scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
      }

      return { normalizedX, normalizedY };
    };

    scope.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      const { clientX: mouseX, clientY: mouseY } = event;

      const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

      contextMenu.classList.remove("visible");

      contextMenu.style.top = `${normalizedY}px`;
      contextMenu.style.left = `${normalizedX}px`;

      setTimeout(() => {
        contextMenu.classList.add("visible");
      });
    });

    scope.addEventListener("click", (e) => {
      // ? close the menu if the user clicks outside of it
      // if (e.target.offsetParent != contextMenu) {
      //   contextMenu.classList.remove("visible");
      // }

      contextMenu.classList.remove("visible");
    });

    // textarea resize
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    }

    // listen for selection and update state
    // document.onselectionchange = () => {
    //   console.log(document.getSelection().toString())
    //   let selection = document.getSelection()
    //   this.setState({ selection: selection.toString() });
    // };


    return note ? (
      <>

        <div id="context-menu">
          <div className="menu-item"
            onMouseDown={() => {
              let selection = window.getSelection().toString();
              navigator.clipboard.writeText(selection)
            }
            }
          >Copy selection</div>
          <div className="menu-item" onMouseDown={() => {
            let selection = window.getSelection()
            this.commentOnSelection(window.getSelection().toString())
          }}
          >Comment 1</div>
          {/* <div className="menu-item" onMouseDown={() =>
            this.commentOnSelection(this.state.selection)}
          >Comment 2</div> */}
        </div>

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
          <section id={'comments'} className='note-comments'>
            <div className='comments-title'>
              <h4>Comments</h4>
            </div>
            <CommentIndex comments={this.state.comments}
              newComment={this.props.newComment}
              note={this.props.note} />
          </section>
        </div>
      </>
    ) : (
      <NoteShowEditorLoader />
    )

  }
}
