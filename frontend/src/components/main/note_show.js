import React from 'react';
import { saveAs } from 'file-saver';
import CommentForm from '../notes/comments/comment_form';
import { orderNoteComments } from "../../util/selectors";
import domtoimage from 'dom-to-image';
import CommentIndex from '../notes/comments/comment_index';
import { getLanguage } from '../../util/webscrap_util';
import NoteCommentsLoader from '../content_loaders/note_show_comments_loader';
import PhotoExportModal from '../modals/photo_export_modal';
import DeleteNoteModal from '../modals/delete_note_modal';
import EditNoteModal from '../modals/edit_note_modal';
import NoteTopActionIcons from './note_show/top_action_icons';
import NoteShowHeader from './note_show/note_show_header';
import NoteShowCodeAndDetails from './note_show/note_code_main';
import CommentModal from '../modals/comment_modal';
import NoteResources from './note_show/note_resources';

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
      hideCommentModal: false,
      isMobile: false 
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
    this.exportImage = this.exportImage.bind(this);
  }
  
  componentDidMount() {
    this._isMounted = true;
    this.props.fetchNote(this.props.noteId);
    this.props.fetchNoteComments(this.props.noteId);
    window.scrollTo(0, 0);

    document.onselectionchange = (e) => {
      e.preventDefault()
      const selectionString = document.getSelection().toString()

      if (selectionString.length > 1) {
        this.setState({
          selectedText: selectionString,
          commentModal: true
        });
      }
    };
  }
  
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }
  
  componentDidUpdate() {
    const { note, comments, currentUser, history, status } = this.props;
    const body = document.getElementsByTagName('body');
    const bodyHeight = body[0].clientHeight;
    const bodyWidth = body[0].clientWidth;
    const isMobileBool = this.isMobile();

    if (isMobileBool !== this.state.isMobile) {
      this.setState({ isMobile: isMobileBool })
    }
    
    if (status === "BUSY" && this.state.status !== "BUSY") {
      this.setState({status: status})
    }
    if (status === "DONE" && (note !== this.state.note || comments !== this.state.comments)) {
      if (currentUser?.id !== note.user.userId && !note.public) {
        history.push(`/home`)
      }
      const orderedComments = orderNoteComments(comments);
      
      this.setState({
        note: note,
        comments: orderedComments,
        isPublic: note.public,
        bodyHeight: bodyHeight,
        bodyWidth: bodyWidth,
        isCurrentUser: currentUser.id === note.user.userId,
        status: status
      })
    }
    if (this.state.bodyHeight !== bodyHeight ||
      this.state.bodyWidth !== bodyWidth) {
      this.setState({
        bodyHeight: bodyHeight,
        bodyWidth: bodyWidth,
      })
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
    const bodyWidth = body[0].clientWidth;

    this.setState({
      bodyHeight: bodyHeight,
      bodyWidth: bodyWidth
    })

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
    const { currentUser, updateNote, noteId, updateNoteTags, updateComment, removeComment, users, deletedComments, fetchNote, addCommentLike, removeCommentLike, fetchNoteComments  } = this.props;
    

    const { note, bodyHeight, bodyWidth, isCurrentUser, commentModal,
      isPublic, hideCommentModal, selectedText, status, comments, isMobile } = this.state;
    
    let modals;

    if (status === "DONE") {
      modals = (
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
            bodyWidth={bodyWidth}
            getLanguage={getLanguage}
            note={note}
            updateNote={updateNote}
            currentUser={currentUser}
            noteId={noteId}
            toggleCommentModalVisibility={this.toggleCommentModalVisibility}
            isMobile={isMobile}
          />

          <CommentModal
            commentModal={commentModal}
            toggleCommentModal={this.toggleCommentModal}
            selectedText={selectedText}
            commentOnSelection={this.commentOnSelection}
            hideCommentModal={hideCommentModal}
          />
        </>
      )
    }
    
    return (
      <div className='note-show-wrapper grid-12-col'>
        { modals }
        <div className='grid-spacer-1-2' />
        <div className={'note-show-container'}>
          
          <NoteTopActionIcons 
            history={this.props.history}
            currentUser={currentUser}
            note={note}
            toggleEditModal={this.toggleEditModal}
            toggleDeleteModal={this.toggleDeleteModal}
            isCurrentUser={isCurrentUser}
            status={status}
          />
          
          <div id="note-show-main" className='note-show-main'>
            
            <NoteShowHeader
              note={note}
              isCurrentUser={isCurrentUser}
              comments={comments}
              isPublic={isPublic}
              handlePublicSwitch={this.handlePublicSwitch}
              updateNoteTags={updateNoteTags}
              isMobile={isMobile}
              status={status}
            />

            <NoteShowCodeAndDetails 
              note={note}
              addNoteLike={this.props.addNoteLike}
              removeNoteLike={this.props.removeNoteLike}
              currentUser={currentUser}
              noteId={noteId}
              toggleExportModal={this.toggleExportModal}
              status={status}
              isMobile={this.state.isMobile}
            />
          </div>
          
          <NoteResources
            note={note}
            status={status}
            isMobile={this.state.isMobile}
          />


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
              selectedText={selectedText}
              isCurrentUser={isCurrentUser}
              currentUser={currentUser}
              comments={comments}
              updateComment={updateComment}
              removeComment={removeComment}
              note={note}
              users={users}
              deletedComments={deletedComments}
              fetchNote={fetchNote}
              noteId={noteId}
              addCommentLike={addCommentLike}
              removeCommentLike={removeCommentLike}
              fetchNoteComments={fetchNoteComments}
              status={status}
            />
          </section>
        </div>
        <div className='grid-spacer-11-12' />
      </div>
    )
  }
}
