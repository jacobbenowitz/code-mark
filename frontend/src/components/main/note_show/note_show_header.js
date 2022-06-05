import React from "react";
import Tags from '../../tags/tags';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SwitchButton from '../../UI/switch_button';
import NoteShowHeaderDesktopLoader from "../../content_loaders/desktop/note_show_header_loader_desktop";
import PublicSwitchLoader from "../../content_loaders/placeholder_components/public_switch_loader";

const NoteShowHeader = ({
  note,
  comments,
  status,
  isMobile,
  isCurrentUser,
  isPublic,
  handlePublicSwitch,
  updateNoteTags }) => {
  
  let headerContent;
  
  if (status === 'DONE') {
    headerContent = (
      <>
        <Link className='username'
          to={`/users/${note.user.userId}`}>@{note.user.username}</Link>
        <h1>{note.title}</h1>

        <div className='note-stats-wrapper'>
          <div className='note-stats'>
            <div className='note-stat likes'>
              <i className="fa-solid fa-heart"></i>
              <span>{note.likes.length}</span>
            </div>
            <div className="note-stat comments">
              <i className="fa-solid fa-comments"></i>
              <span>{comments.length}</span>
            </div>
            <div className='note-stat updated-at'>
              <i className="fa-solid fa-pencil"></i>
              <span>{moment(note.updatedAt).fromNow()}</span>
            </div>
            <div className='note-stat created-at'>
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span>{moment(note.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className='note-public-switch-wrapper'>
            <div className='note-public-switch'>
              <SwitchButton
                isCurrentUser={isCurrentUser}
                isToggled={isPublic}
                onToggle={handlePublicSwitch}
              />
            </div>
          </div>
        </div>
        <div className='tags-section-wrapper'>
          <Tags note={note}
            isCurrentUser={isCurrentUser}
            updateNoteTags={updateNoteTags}
          />
        </div>
      </>
    )
  } else {
    headerContent = (
      <div className="loader-wrapper">
        <NoteShowHeaderDesktopLoader />
        <div className="public-loader">
          <PublicSwitchLoader />
        </div>
      </div>
      )
    }
    
    return (
      <div className={'note-show-title'}>
        {headerContent}
      </div>
    )
}

export default NoteShowHeader;