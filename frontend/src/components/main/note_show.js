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
import TagsExportSimple from '../tags/tags_export_simple';
// credit context menu: https://itnext.io/how-to-create-a-custom-right-click-menu-with-javascript-9c368bb58724
// textarea resize: https://stackoverflow.com/questions/20775824/after-clicking-on-selected-text-window-selection-is-not-giving-updated-range
import CommentIndex from '../notes/comments/comment_index';
import ResourceItem from '../notes/resources/resource_item';
import { Link, Redirect } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import codeMarkLogo from './logo/codemark-logo-primary.svg';
import LikeNoteIcon from '../notes/like_note_icon';
import moment from 'moment';
import SwitchButton from '../UI/switch_button';
import CodeEditorExportImage from '../code_editor/code_editor_export_img';
import CodeCommentReadOnly from '../code_editor/code_comment_readonly';
import CodeCommentReadOnlyMini from '../code_editor/code_comment_readonly_mini';
import { getLanguage } from '../../util/webscrap_util';


export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      comments: [],
      selectedText: '',
      commentSnippet: '',
      commentModal: false,
      public: true,
      textHeight: undefined,
      bodyHeight: 0,
      isCurrentUser: false
    }
    this.deleteNote = this.deleteNote.bind(this);
    this.exportImage = this.exportImage.bind(this);
    this.handlePublicSwitch = this.handlePublicSwitch.bind(this);
    this.toggleExportModal = this.toggleExportModal.bind(this);
    this.commentOnSelection = this.commentOnSelection.bind(this);
    this.clearSnippet = this.clearSnippet.bind(this);
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchNote(this.props.noteId);
    this.props.fetchNoteComments(this.props.noteId);
  }

  componentDidMount() {
    this._isMounted = true;
    window.scrollTo(0, 0)
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
        public: note?.public,
        bodyHeight: bodyHeight,
        isCurrentUser: this.props.currentUser?.id === this.props.note?.user.userId
      })
    }
    // add selection listener to main note section ONLY
    if (Object.values(this.state.note).length) {
      // event listener does not work on div ? therefore must use document...
      // const noteMain = document.getElementById('note-codemirror')
      document.onselectionchange = (e) => {
        e.preventDefault()
        const selectionString = document.getSelection().toString()
        const selectionCommentModal = document.getElementById('comment-highlight-text')

        if (selectionString.length > 1) {
          this.setState({
            selectedText: selectionString,
            commentModal: true
          });
        }
      };
    }
  }


  deleteNote() {
    this.props.history.goBack();
    this.props.removeNote(this.props.noteId)
  }

  toggleEditModal() {
    // debugger
    const editNoteModal = document.getElementById('edit-note-container');
    const commentHighlightModal = document.getElementById('comment-highlight-text');

    if (editNoteModal.className === "modal-off" || editNoteModal.className === "modal-out") {
      editNoteModal.className = "modal-on"
      commentHighlightModal.className = "modal-compact hidden"
    } else {
      editNoteModal.className = "modal-out"
    }
  }

  toggleDeleteModal() {
    const deleteModal = document.getElementById('confirm-modal-container');
    if (deleteModal.className === "modal-off" || deleteModal.className === "modal-out") {
      deleteModal.className = "modal-on";
    } else {
      deleteModal.className = "modal-out";
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
    this.setState({ commentSnippet: this.state.selectedText })
    this.toggleCommentModal()
    commentSection.scrollIntoView({ behavior: 'smooth' });
  }

  clearSnippet() {
    this.setState({ commentSnippet: '' })
  }

  toggleExportModal() {
    const exportModal = document.getElementById('note-export-modal');
    const body = document.getElementsByTagName('body');
    const bodyHeight = body[0].clientHeight;
    this.setState({ bodyHeight: bodyHeight })
    if (exportModal.className === 'modal-on') {
      exportModal.className = 'modal-out'
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

  toggleCommentModal() {
    this.setState({ commentModal: !this.state.commentModal })
  }

  isMobile() {
    return window.innerWidth < 680;
  }


  render() {
    const { currentUser, updateNote, noteId } = this.props;
    const { note } = this.state;

    return Object.values(note).length ? (
      <>
        {/* PHOTO EXPORT MODAL */}
        <div id="note-export-modal" className='modal-off'
          style={{ 'height': this.state.bodyHeight }}
        >
          <div className='action-buttons'>
            <div className='export icon-button'
              onClick={() => this.exportImage()}>
              <i className="fa-solid fa-download" />
              <span>download</span>
            </div>
            <div className='cancel-export icon-only-button'
              onClick={() => this.toggleExportModal()}>
              <i className="fa-solid fa-xmark fa-xl" />
            </div>
          </div>
          <div className='spacer-150-h'></div>
          <div className='export-dots-wrapper'>
            <div id='content-export' className='note-show-main'>
              <div className='content-wrapper'>
                <div className='note-show-title'>
                  <span className='username'>@{note?.user.username}</span>
                  <h4>{note.title}</h4>
                </div>
                <div className='note-tags-wrapper'>
                  <TagsExportSimple
                    tags={note.tags}
                  />
                </div>
                <div className='code-note-body' id='code-note-view'>
                  <CodeEditorExportImage codeBody={note.codebody} />
                </div>
                {this.state.textdetails ? (
                  <div className='note-textDetails'>
                    <span className='textDetails-show'>
                      {note.textdetails}
                    </span>
                  </div>
                ) : ''}
              </div>
              <img className='export-logo'
                src={codeMarkLogo} />
            </div>
          </div>
        </div>
        {/* DELETE NOTE MODAL */}
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
        {/* NOTE ACTIONS // NOTE MAIN */}
        <div id='edit-note-container' className="modal-off" style={{height:this.state.bodyHeight}}>
          <div className='modal-wrapper'>
            <EditNote
              getLanguage={getLanguage}
              note={note} updateNote={updateNote}
              currentUser={currentUser} noteId={noteId}/>
          </div>
        </div>
        <div className={this.isMobile() ? 'note-show-container span-12' : 'note-show-container center-span-7'}>
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
          {/* NOTE SHOW MAIN */}
          <div id="note-show-main" className='note-show-main'>
            {this.isMobile() ? (
              note ? (
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
                          isCurrentUser={this.state.isCurrentUser}
                          isToggled={this.state.public}
                          onToggle={this.handlePublicSwitch}
                      />
                    </div>
                    </div>
                  </div>
                  <span className='tags-header'>TAGS</span>
                    <Tags note={this.state.note}
                      isCurrentUser={this.props.currentUser.id === this.props.note.user.userId}
                      updateNote={this.props.updateNote}
                    />
              </div>
              ) : ''
            ) : (
                note ? (
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
                            isCurrentUser={this.state.isCurrentUser}
                            isToggled={this.state.public}
                            onToggle={this.handlePublicSwitch}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='tags-section-wrapper'>
                      <span className='tags-header'>TAGS</span>
                        <Tags note={this.state.note}
                          isCurrentUser={this.props.currentUser.id === this.props.note.user.userId}
                          updateNote={this.props.updateNote}
                        />
                    </div>
                  </div>
                ) : ''
            )}

            {/* note main */}
            <div className='code-note-body' id='code-note-view'>
              {note ? (
                <>
                
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
                      <div id='export-img-icon' className='note-icon'
                        onClick={this.toggleExportModal}
                        // onClick={this.exportImage}
                        title="export a screenshot">
                        <i className="fa-solid fa-camera-retro fa-lg"></i>
                      </div>
                      <div className='note-icon info-icon' id='highlight-comment-code-icon'>
                        <i className="fa-solid fa-circle-question fa-lg"></i>
                      </div>
                    </div>
                  </div>
                  
                  {/* COMMENT MODAL */}
                  <div id='comment-highlight-text'
                    className={this.state.commentModal ?
                      'modal-expanded' : 'modal-compact'}>
                    <div className='arrow-modal'
                      onClick={this.toggleCommentModal}
                    >
                      {this.state.commentModal ? (
                        <i className="fa-solid fa-chevron-right fa-xl" />
                      ) : (
                        <i className="fa-solid fa-chevron-left fa-xl" />
                      )}
                    </div>
                    <div className='modal-main'>
                      <div className='comment-selection-title'>
                        <i className="fa-solid fa-comment" />
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
                  </div>
    
                  <CodeEditorNoteShow
                    codeBody={note.codebody}
                  />
                </>
                ) :  <NoteShowEditorLoader />}
            </div>
            {note?.textdetails ? (
            <div className='note-textDetails'>
                <span className='textDetails-show'>
                  {note.textdetails}
                </span>
            </div>
              ) : ''}
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
          ) : ''}
          {/* COMMENTS SECTION */}
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
              clearSnippet={this.clearSnippet}
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
              // toggleModal={this.props.toggleModal}
            />
          </section>
        </div>
      </>
    ) : (
      <NoteShowEditorLoader />
    )

  }
}
