import React from 'react';
import { saveAs } from 'file-saver';
import NoteShowEditorLoader from '../code_editor/code_show_editor_loader';
import CodeEditorNoteShow from '../code_editor/code_editor_note_show_readonly';
import CommentForm from '../notes/comments/comment_form';
import { orderNoteComments } from "../../util/selectors";
import domtoimage from 'dom-to-image';
import CommentIndex from '../notes/comments/comment_index';
import ResourceItem from '../notes/resources/resource_item';
import LikeNoteIcon from '../notes/like_note_icon';
import CodeCommentReadOnlyMini from '../code_editor/code_comment_readonly_mini';
import { getLanguage } from '../../util/webscrap_util';
import NoteShowTopLoader from '../lazy_loaders/note_show_top_loader';
import ActionIconsLoader from '../lazy_loaders/note_show_action_icons_loader';
import NoteCommentsLoader from '../lazy_loaders/note_show_comments_loader';
import PhotoExportModal from '../modals/photo_export_modal';
import DeleteNoteModal from '../modals/delete_note_modal';
import EditNoteModal from '../modals/edit_note_modal';
import NoteTopActionIcons from './note_show/top_action_icons';
import NoteShowHeader from './note_show/note_show_header';

export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      comments: [],
      selectedText: '',
      commentSnippet: '',
      commentModal: false,
      isPublic: true,
      textHeight: undefined,
      bodyHeight: 0,
      isCurrentUser: false,
      hideCommentModal: false
    }
    this.bindHandlers()
  }

  bindHandlers() {
    this.deleteNote = this.deleteNote.bind(this);
    this.handlePublicSwitch = this.handlePublicSwitch.bind(this);
    this.toggleExportModal = this.toggleExportModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.commentOnSelection = this.commentOnSelection.bind(this);
    this.clearSnippet = this.clearSnippet.bind(this);
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.toggleCommentModalVisibility =
      this.toggleCommentModalVisibility.bind(this);
    this.exportImage = this.exportImage.bind(this)
      ;  }
  
  componentDidMount() {
    this._isMounted = true;
    this.props.fetchNote(this.props.noteId);
    this.props.fetchNoteComments(this.props.noteId);
    window.scrollTo(0, 0);
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  componentDidUpdate() {
    const { note, comments, currentUser, history } = this.props;
    const body = document.getElementsByTagName('body');
    const bodyHeight = body[0].clientHeight;
    
    if (note && (note !== this.state.note || this.state.comments
      !== comments)) {
      
      if (currentUser?.id !== note.user.userId && !note.public) {
        history.push(`/home`)
      }
      const orderedComments = orderNoteComments(comments);
      this.setState({
        note: note,
        comments: orderedComments,
        isPublic: note.public,
        bodyHeight: bodyHeight,
        isCurrentUser: this.props.currentUser?.id === this.props.note?.user.userId
      })
    }
    if (Object.values(this.state.note).length) {
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
    setTimeout(() => {
      this.props.removeNote(this.props.noteId)
    }, 200)
    this.props.history.goBack()
  }

  toggleEditModal() {
    const editNoteModal = document.getElementById('edit-note-container');

    if (editNoteModal.className === "modal-off" || editNoteModal.className === "modal-out") {
      editNoteModal.className = "modal-on"
      this.setState({hideCommentModal: true})

    } else {
      editNoteModal.className = "modal-out"
      this.setState({hideCommentModal: false})
    }
  }

  toggleCommentModalVisibility() {
    this.setState({ hideCommentModal: !this.state.hideCommentModal })
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
    debugger
    let newStatus = !this.state.isPublic
    this.props.updateNotePublicStatus(
      { public: newStatus }, this.props.noteId
    ).then(() => {
      this.setState(
        { isPublic: newStatus }
      )
    })
  }

  commentOnSelection() {
    const commentSection = document.getElementById("comments");
    this.setState({
      commentSnippet: this.state.selectedText,
      selectedText: ''
    })
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

  toggleCommentModal() {
    this.setState({ commentModal: !this.state.commentModal })
  }

  exportImage() {
    const { note } = this.state;
    const noteItem = document.getElementById('content-export');
    const username = note.user.username;
    const title = note.title;
    const scale = 2;
    const image = domtoimage.toPng(noteItem, {
      height: noteItem.offsetHeight * scale,
      style: {
        transform: `scale(${scale}) translate(${noteItem.offsetWidth / 2 / scale}px, ${noteItem.offsetHeight / 2 / scale}px)`
      },
      width: noteItem.offsetWidth * scale
    }).then(function (scaledImg) {
      saveAs(scaledImg, `${title}-by-${username}-CodeMark`)
    }).then(() => toggleExportModal())
  };

  isMobile() {
    return window.innerWidth < 680;
  }


  render() {
    const { currentUser, updateNote, noteId,
      comments, updateNoteTags } = this.props;
    const { note, bodyHeight, isCurrentUser,
      isPublic } = this.state;
    
    return Object.values(note).length ? (
      <>
        <PhotoExportModal
          bodyHeight={bodyHeight}
          note={note}
          toggleExportModal={this.toggleExportModal}
          exportImage={this.exportImage}
        />

        <DeleteNoteModal
          deleteNote={this.deleteNote}
          bodyHeight={bodyHeight}
          toggleDeleteModal={this.toggleDeleteModal}
        />
        
        <EditNoteModal
          bodyHeight={bodyHeight}
          getLanguage={getLanguage}
          note={note}
          updateNote={updateNote}
          currentUser={currentUser}
          noteId={noteId}
          toggleCommentModalVisibility={this.toggleCommentModalVisibility}
        />

        <div className={this.isMobile() ?
          'note-show-container span-12' : 'note-show-container center-span-7'}>
          
          <NoteTopActionIcons 
            history={this.props.history}
            currentUser={currentUser}
            note={note}
            toggleEditModal={this.toggleEditModal}
            toggleDeleteModal={this.toggleDeleteModal}
            isCurrentUser={isCurrentUser}
          />
          
          {/* NOTE SHOW MAIN */}
          <div id="note-show-main" className='note-show-main'>
            <NoteShowHeader
              note={note}
              isCurrentUser={isCurrentUser}
              comments={comments}
              isPublic={isPublic}
              handlePublicSwitch={this.handlePublicSwitch}
              updateNoteTags={updateNoteTags}
              isMobile={this.isMobile}
            />

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
                  {this.state.hideCommentModal && note ? '' : (
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
                          {this.state.selectedText ? (
                            <span>Comment on this selection:</span>
                            ) : (
                              <span>Select code from this note to comment on it directly</span>
                              )}
                        </div>
                        {
                          this.state.selectedText ? (
                          <CodeCommentReadOnlyMini
                              codeSnippet={this.state.selectedText} />
                          ) : ''
                        }
                        {
                          this.state.selectedText ? (
                            <div className='icon-button'
                              onClick={this.commentOnSelection}>
                              <span>Comment</span>
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                          ) : ''
                        }
                      </div>
                    </div>
                  )}
    
                  <CodeEditorNoteShow
                    codeBody={note.codebody}
                    language={note.language}
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
                {this.props.note.resources?.map((resource, i) =>
                  <ResourceItem
                    resource={resource}
                    key={`resource-${i}`}
                  />
                )}
              </div>
            </div>
          ) : ''}
          {/* COMMENTS SECTION */}
          <section id={'comments'} className='note-comments'>
            <div className='comments-title'>
              <h4>Comments</h4>
              <p>Select any part of the CodeMark above to comment on that snippet!</p>
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
              comments={this.state?.comments}
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
        <div className='note-show-container center-span-7'>
          <div className="note-show-top-icons">
            <ActionIconsLoader />
          </div>
          <div className='note-show-main'>
            <NoteShowTopLoader />
          </div>
          <div className='note-comments'>
            <NoteCommentsLoader />
          </div>
        </div>
    )

  }
}
