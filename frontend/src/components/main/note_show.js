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
import CodeEditorExportImage from '../code_editor/code_editor_export_img';
import CodeCommentReadOnly from '../code_editor/code_comment_readonly';
import CodeCommentReadOnlyMini from '../code_editor/code_comment_readonly_mini';


export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      comments: [],
      selectedText: '',
      commentSnippet: '',
      commentModal: false,
      public: undefined,
      textHeight: undefined,
      bodyHeight: 0
    }
    this.deleteNote = this.deleteNote.bind(this);
    this.exportImage = this.exportImage.bind(this);
    this.handlePublicSwitch = this.handlePublicSwitch.bind(this);
    this.toggleExportModal = this.toggleExportModal.bind(this);
    this.commentOnSelection = this.commentOnSelection.bind(this)
  }

  componentWillMount() {
    this.props.fetchNote(this.props.noteId);
    this.props.fetchNoteComments(this.props.noteId);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    const scope = document.querySelector("body");
    // remove click eventListener for contextmenu
    scope.removeEventListener("contextmenu", (event) => {
      contextMenu.className = "";
    });
    
    // remove click eventListener
    scope.removeEventListener("click", (e) => {
      contextMenu.className = "";
    });
    this._isMounted = false;
  }

  componentDidUpdate() {
    const { note, comments } = this.props;
    const body = document.getElementsByTagName('body');
    const bodyHeight = body[0].clientHeight;
    if (note && note !== this.state.note || this.state.comments !== comments) {
      const orderedComments = orderNoteComments(comments);
      this.setState({
        note: note,
        comments: orderedComments,
        public: note.public,
        bodyHeight: bodyHeight
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
      this.props.history.goBack()
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

  commentOnSelection() {
    const commentSection = document.getElementById("comments");
    this.setState({ commentSnippet: this.state.selectedText})
    commentSection.scrollIntoView({ behavior: 'smooth' });
  }

  toggleExportModal() {
    const exportModal = document.getElementById('note-export-modal');
    const body = document.getElementsByTagName('body');
    const bodyHeight = body[0].clientHeight;
    console.log(bodyHeight)
    this.setState({bodyHeight: bodyHeight})
    if (exportModal.className === 'modal-on') {
      exportModal.className = 'modal-off'
    } else {
      exportModal.className = 'modal-on'
      window.scrollTo(0, 0)
    }
  }

  exportImage() {
    const noteItem = document.getElementById('content-export');
    const username = this.state.note.user.username;
    const title = this.state.note.title;
    const scale = 2;
    const image = domtoimage.toPng(noteItem, {
      height: noteItem.offsetHeight * scale,
      style: {
        transform: `scale(${scale}) translate(${noteItem.offsetWidth / 2 / scale}px, ${noteItem.offsetHeight / 2 / scale}px)`
      },
      width: noteItem.offsetWidth * scale
    }).then(function (scaledImg) {
      window.saveAs(scaledImg, `${title}-by-${username}-CodeMark`)
    }).then(() => this.toggleExportModal())

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

    // textarea resize
    // use state for textarea height and pass props 
    // const tx = document.querySelectorAll("textarea");
    // for (let i = 0; i < tx.length; i++) {
    //   tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    //   tx[i].addEventListener("input", OnInput, false);
    // }

    // function OnInput() {
    //   this.style.height = "auto";
    //   this.style.height = (this.scrollHeight) + "px";
    // }

    // listen for selection and update state 
    document.onselectionchange = (e) => {
      e.preventDefault()
      const selectionString = document.getSelection().toString()
      const selectionCommentModal = document.getElementById('comment-highlight-text')

      if (selectionString.length > 1) {
        this.setState({ selectedText: selectionString });
        // selectionCommentModal.className = 'modal-on'
        // setTimeout(() => {
        //   selectionCommentModal.className = 'modal-out';
        //   setTimeout(() => {
        //     selectionCommentModal.className = 'modal-hidden'
        //   }, 500)
        // }, 3000)
        
        // selectionCommentModal.addEventListener('mouseenter', () => {
        //   const modal = document.getElementById('comment-highlight-text')
        //   modal.className = 'modal-on hover'
        // })
  
        // selectionCommentModal.addEventListener('mouseleave', () => {
        //   setTimeout(() => {
        //     selectionCommentModal.className = 'modal-out';
        //     setTimeout(() => {
        //       selectionCommentModal.className = 'modal-hidden'
        //     }, 500)
        //   }, 2000)
        // })
      }

    };

    return Object.values(note).length ? (
      <>
        {/* PHOTO EXPORT MODAL */}
        <div id="note-export-modal" className='modal-off'
          style={{'height': this.state.bodyHeight}}
        >
          <div className='action-buttons'>
            <div className='export icon-button'
              onClick={() => this.exportImage()}>
              <i className="fa-solid fa-download" />
              <span>download</span>
            </div>
            <div className='cancel-export icon-button'
              onClick={() => this.toggleExportModal()}>
              <i className="fa-solid fa-xmark fa-xl" />
              <span>cancel</span>
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
              <CodeEditorExportImage codeBody={note.codebody} />
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
              currentUser={currentUser} noteId={noteId} />
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

              <div id='comment-highlight-text' className='modal-on'>
                <div className='comment-selection-title'>
                <span>Comment on this selection:</span>
                </div>
                <CodeCommentReadOnlyMini
                  codeSnippet={this.state.selectedText}
                />
                <div className='icon-button'
                  onClick={this.commentOnSelection}>
                  <span>Comment</span>
                  <i className="fa-solid fa-arrow-right" />
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
            <CommentForm
              noteId={noteId}
              composeComment={this.props.composeComment}
              selectedText={this.state.commentSnippet}
              currentUser={currentUser}
            />
            <CommentIndex
              selectedText={this.state.selectedText}
              isCurrentUser={this.props.currentUser.id === this.props.note.user.userId}
              currentUser={this.props.currentUser}
              comments={this.state.comments}
              updateComment={this.props.updateComment}
              removeComment={this.props.removeComment}
              note={this.props.note}
              users={this.props.users}
              deletedComments={this.props.deletedComments}
              fetchNote={this.props.fetchNote}
              noteId={this.props.noteId}
              addCommentLike={this.props.addCommentLike}
              removeCommentLike={this.props.removeCommentLike}
            />
          </section>
        </div>
      </>
    ) : (
      <NoteShowEditorLoader />
    )

  }
}
