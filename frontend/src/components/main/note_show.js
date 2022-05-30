import React from 'react';
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import NoteShowEditorLoader from '../code_editor/code_show_editor_loader';
import CodeEditorNoteShow from '../code_editor/code_editor_note_show_readonly';
import EditNote from '../code_editor/edit_note';
import CommentFormContainer from '../notes/comments/comment_form_container';
import CommentForm from '../notes/comments/comment_form';
import CommentFormModal from '../notes/comments/comment_form_modal';
// import { selectNoteComments } from "../../util/selectors";
import { orderNoteComments } from "../../util/selectors";
import CommentItem from '../notes/comments/comment_item';
import Tags from '../tags/tags';
import TagsExport from '../tags/tags_export';
// credit context menu: https://itnext.io/how-to-create-a-custom-right-click-menu-with-javascript-9c368bb58724
// textarea resize: https://stackoverflow.com/questions/20775824/after-clicking-on-selected-text-window-selection-is-not-giving-updated-range
import CommentIndex from '../notes/comments/comment_index';
import ResourceItem from '../notes/resources/resource_item';
import { Link, Redirect } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import LikeNoteIcon from '../notes/like_note_icon';
import moment from 'moment';
import SwitchButton from '../UI/switch_button';


export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      comments: [],
      selectedText: '',
      commentModal: false,
      public: undefined,
      textHeight: undefined,
    }
    this.deleteNote = this.deleteNote.bind(this);
    this.exportImage = this.exportImage.bind(this);
    this.handlePublicSwitch = this.handlePublicSwitch.bind(this);
  }

  componentWillMount() {
    this.props.fetchNote(this.props.noteId);
    this.props.fetchNoteComments(this.props.noteId);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    const { note, comments } = this.props;
    // debugger
    if (note && note !== this.state.note || this.state.comments !== comments) {
      // debugger
      const orderedComments = orderNoteComments(comments);
      this.setState({
        note: note,
        comments: orderedComments,
        public: note.public
      })
    }
    // if (!Object.values(this.state.note).length || this.state.comments !== comments && Object.values(note).length && Object.values(comments).length) {
    //   debugger
    //   this.setState({
    //     note: note,
    //     comments: orderedComments,
    //     public: note.public
    //   })
    // }
  }

  deleteNote() {
    this.props.removeNote(this.props.noteId).then(() => {
      this.props.history.goBack();
    })
    // this.props.toggleModal();
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

  handlePublicSwitch() {
    let newStatus = !this.state.public
    this.props.updateNote(
      { public: newStatus }, this.props.noteId
    ).then(() => {
      this.setState(
        { public: newStatus }
      )
    })
  }

  commentOnSelection(selection) {
    this.setState({
      selectedText: selection
    })
    const commentSection = document.getElementById("comments");
    // const newSnippetField = document.getElementById("code-snippet-new");
    // newSnippetField.focus();
    // newSnippetField.value = selection;
    commentSection.scrollIntoView({ behavior: 'smooth' });
  }

  toggleExportModal() {
    const exportModal = document.getElementById('note-export-modal');
    if (exportModal.className === 'modal-on') {
      exportModal.className = 'modal-off'
    } else {
      exportModal.className = 'modal-on'
    }
  }

  exportImage() {
    const noteItem = document.getElementById('note-show-main');

    // domtoimage.toPng(noteItem)
    //   .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });

    const scale = 2;
    const image = domtoimage.toPng(noteItem, {
      height: noteItem.offsetHeight * scale,
      style: {
        transform: `scale(${scale}) translate(${noteItem.offsetWidth / 2 / scale}px, ${noteItem.offsetHeight / 2 / scale}px)`
      },
      width: noteItem.offsetWidth * scale
    }).then(function (scaledImg) {
      window.saveAs(scaledImg, 'test-img-scaled.png')
    })


    // domtoimage.toBlob(noteItem, { height: 2000, width: 1000 })
    //   .then(function (blob) {
    //     window.saveAs(blob, 'test-img.png')
    //   });
  };

  isMobile() {
    return window.innerWidth < 600;
  }


  render() {

    const { currentUser, updateNote, noteId } = this.props;
    const { note } = this.state;
    const contextMenu = document.getElementById("context-menu");
    const scope = document.querySelector("body");
    const codeNote = document.getElementById('code-note-view')

    // const normalizePozition = (mouseX, mouseY) => {
    //   // ? compute what is the mouse position relative to the container element (scope)
    //   const {
    //     left: scopeOffsetX,
    //     top: scopeOffsetY,
    //   } = scope.getBoundingClientRect();

    //   const scopeX = mouseX - scopeOffsetX;
    //   const scopeY = mouseY - scopeOffsetY;

    //   // ? check if the element will go out of bounds
    //   const outOfBoundsOnX =
    //     scopeX + contextMenu.clientWidth > scope.clientWidth;

    //   const outOfBoundsOnY =
    //     scopeY + contextMenu.clientHeight > scope.clientHeight;

    //   let normalizedX = mouseX;
    //   let normalizedY = mouseY;

    //   // ? normalzie on X
    //   if (outOfBoundsOnX) {
    //     normalizedX =
    //       scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
    //   }

    //   // ? normalize on Y
    //   if (outOfBoundsOnY) {
    //     normalizedY =
    //       scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
    //   }

    //   return { normalizedX, normalizedY };
    // };

    scope.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      const { clientX: mouseX, clientY: mouseY } = event;

      contextMenu.classList.remove("visible");
      contextMenu.style.top = `${mouseY}px`;
      contextMenu.style.left = `${mouseX}px`;

      setTimeout(() => {
        contextMenu.classList.add("visible");
      });
    });

    // ? close the menu if the user clicks outside of it
    scope.addEventListener("click", (e) => {
      // add conditional id contextmenu is visible
      if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
      }
      contextMenu.classList.remove("visible");
    });

    // textarea resize
    // use state for textarea height and pass props 
    const tx = document.querySelectorAll("textarea");
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
    // let selection = document.getSelection()
    // console.log(document.getSelection())
    // this.setState({ selectedText: selection.toString() });
    // };

    return Object.values(note).length ? (
      <>
        <div id="context-menu">
          <div className="menu-item" onMouseDown={() => {
            let selection = window.getSelection()
            this.commentOnSelection(selection.toString())
          }}>Comment on this selection</div>
          <div className="menu-item"
            onMouseDown={() => {
              let selection = window.getSelection().toString();
              navigator.clipboard.writeText(selection)
            }}>Copy selection</div>
          {/* <div className="menu-item" onMouseDown={() =>
            this.commentOnSelection(this.state.selection)}
          >Comment 2</div> */}
        </div>

        {/* PHOTO EXPORT MODAL */}
        <div id="note-export-modal" className='modal-off'>
          <div className='export-controls'>
            <div className='cancel icon-button'
              onClick={() => this.toggleExportModal()}>
              <i class="fa-solid fa-xmark fa-xl" />
            </div>
          </div>


          <div id='content-export' className='note-show-main'>
            <div className='note-show-title'>
              <span className='username'>@{note.user.username}</span>
              <h1>{note.title}</h1>
            </div>
            <div className='note-tags-wrapper'>
              <TagsExport note={this.state.note} />
            </div>
            <div className='code-note-body' id='code-note-view'>
              <CodeEditorReadOnly codeBody={note.codebody} />
            </div>
            <div className='note-textDetails'>
              <span className='textDetails-show'>
                {note.textdetails}
              </span>
            </div>
          </div>
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
              currentUser={currentUser} noteId={noteId} toggleModal={this.props.toggleModal}/>
          </div>
        </div>
        <div className='note-show-container center-span-7'>
          <div className='note-show-top-icons'>
            <div className='back-page icon-button'

              onClick={() => this.props.history.goBack()}>
              <i className="fa-solid fa-arrow-left fa-lg"></i>
              <span>
                Back
              </span>
            </div>


            {this.props.currentUser.id === this.props.note.user.userId ? (
              <div className='edit-note icon-button'
                onClick={() => this.toggleEditModal()}>
                <i className="fa-solid fa-pen-to-square fa-lg"></i>
                <span>
                  Edit
                </span>
              </div>
            ) :
              ""
            }

            {this.props.currentUser.id === this.props.note.user.userId ? (
              <div className='delete-note icon-button'
                onClick={() => this.toggleDeleteModal()}>
                <i className="fa-solid fa-trash fa-lg"></i>
                <span>
                  Delete
                </span>
              </div>
            ) : ""}
          </div>

          <div id="note-show-main" className='note-show-main'>
            {this.isMobile() ? (
              <div className='note-show-title mobile'>
                <Link className='username'
                  to={`/users/${note.user.userId}`}>@{note.user.username}</Link>
                <h1>{note.title}</h1>
                <div className='note-stats-wrapper'>
                  <div className='note-stats'>
                    <div className='note-stat likes'>
                      <i className="fa-solid fa-heart"></i>
                      <span>{this.props.note.likes.length}</span>
                    </div>
                    <div className="note-stat comments">
                      <i className="fa-solid fa-comments"></i>
                      <span>{this.props.comments.length}</span>
                    </div>
                  </div>
                  <div className='note-stats'>
                    <div className='note-stat updated-at'>
                      <i className="fa-solid fa-pencil"></i>
                      <span>{moment(this.props.note.updatedAt).fromNow()}</span>
                    </div>
                    <div className='note-stat created-at'>
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span>{moment(this.props.note.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div className='note-public-switch-wrapper'>
                    <div className='note-public-switch'>
                      <SwitchButton
                        isToggled={this.state.public}
                        onToggle={this.handlePublicSwitch}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='note-show-title'>
                <Link className='username'
                  to={`/users/${note.user.userId}`}>@{note.user.username}</Link>
                <h1>{note.title}</h1>
                <div className='note-stats-wrapper'>
                  <div className='note-stats'>
                    <div className='note-stat likes'>
                      <i className="fa-solid fa-heart"></i>
                      <span>{this.props.note.likes.length}</span>
                    </div>
                    <div className="note-stat comments">
                      <i className="fa-solid fa-comments"></i>
                      <span>{this.props.comments.length}</span>
                    </div>
                    <div className='note-stat updated-at'>
                      <i className="fa-solid fa-pencil"></i>
                      <span>{moment(this.props.note.updatedAt).fromNow()}</span>
                    </div>
                    <div className='note-stat created-at'>
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span>{moment(this.props.note.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div className='note-public-switch-wrapper'>
                    <div className='note-public-switch'>
                      <SwitchButton
                        isToggled={this.state.public}
                        onToggle={this.handlePublicSwitch}
                      />
                    </div>
                  </div>
                </div>
              </div>

            )}

            <div className='note-tags-wrapper'>
              <Tags note={this.state.note}
                isCurrentUser={this.props.currentUser.id === this.props.note.user.userId}
                updateNote={this.props.updateNote}
              />
            </div>

            <div className='code-note-body' id='code-note-view'>
              <div className='icons-wrapper'>
                <div className='icons-left-col'>
                  <LikeNoteIcon
                    addNoteLike={this.props.addNoteLike}
                    removeNoteLike={this.props.removeNoteLike}
                    currentUserId={this.props.currentUser.id}
                    noteId={this.props.noteId}
                    likes={this.props.note.likes}
                  />
                </div>
                <div className='icons-right-col'>
                  <div className='hidden' id='highlight-instructions'>
                    <span>Highlight any section of the CodeMark and right click to comment!</span>
                  </div>
                  <div className='note-icon info-icon' id='highlight-comment-code-icon'>
                    <i className="fa-solid fa-circle-question fa-lg"></i>
                  </div>
                  <div id='export-img-icon' className='note-icon'
                    onClick={this.toggleExportModal}
                    // onClick={this.exportImage}
                    title="export a screenshot">
                    <i className="fa-solid fa-camera-retro fa-lg"></i>
                  </div>
                </div>
              </div>
              <CodeEditorNoteShow
                codeBody={note.codebody}
              />
            </div>
            <div className='note-textDetails'>
              <span className='textDetails-show'>
                {note.textdetails}
              </span>
            </div>
          </div>

          {this.props.note.resources?.length ? (
            <div className='note-resources'>
              <div className='resources-title'>
                <h4>Resources</h4>
              </div>
              <div className='resources-list'>
                {this.props.note.resources?.map(resource =>
                  <ResourceItem resource={resource} />
                )}
              </div>
            </div>
          ) : ""}
          <section id={'comments'} className='note-comments'>
            <div className='comments-title'>
              <h4>Comments</h4>
              <p>Select any part of the CodeMark above and right click to comment on that snippet!</p>
            </div>
            <CommentIndex
              selectedText={this.state.selectedText}
              isCurrentUser={this.props.currentUser.id === this.props.note.user.userId}
              currentUser={this.props.currentUser}
              comments={this.state.comments}
              newComment={this.props.newComment}
              composeComment={this.props.composeComment}
              updateComment={this.props.updateComment}
              removeComment={this.props.removeComment}
              note={this.props.note}
              users={this.props.users}
              deletedComments={this.props.deletedComments}
              fetchNote={this.props.fetchNote}
              fetchNoteComments={this.props.fetchNoteComments}
              noteId={this.props.noteId}
              addCommentLike={this.props.addCommentLike}
              removeCommentLike={this.props.removeCommentLike}
              toggleModal={this.props.toggleModal}
            />
          </section>
        </div>
      </>
    ) : (
      <NoteShowEditorLoader />
    )

  }
}
