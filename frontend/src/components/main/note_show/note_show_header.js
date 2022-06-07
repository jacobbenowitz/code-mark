import React from "react";
import Tags from '../../tags/tags';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SwitchButton from '../../UI/switch_button';
import NoteShowHeaderDesktopLoader from "../../content_loaders/desktop/note_show_header_loader_desktop";
import PublicSwitchLoader from "../../content_loaders/placeholder_components/public_switch_loader";
import NoteShowTitleStatsLoaderMobile from "../../content_loaders/mobile/note_show_title_stats_loader_mobile";
import NoteShowTagsLoaderMobile from "../../content_loaders/mobile/note_show_tags_loader_mobile";

const NoteShowHeader = ({
  note,
  comments,
  status,
  isMobile,
  isCurrentUser,
  isPublic,
  handlePublicSwitch,
  updateNoteTags }) => {
  
  let headerContent, publicSwitch;

  if (!note.sample) {
    publicSwitch = (
      <div className='note-public-switch-wrapper'>
        <div className='note-public-switch'>
          <SwitchButton
            isCurrentUser={isCurrentUser}
            isToggled={isPublic}
            onToggle={handlePublicSwitch}
          />
        </div>
      </div>
    )
  }
  
  if (status === 'DONE') {
    headerContent = (
      <>
        <Link className='username'
          to={`/users/${note.user.userId}`}>@{note.user.username}</Link>
        <h1>{note.title}</h1>

        <div className='note-stats-wrapper'>
          <div className='note-stats'>
            <div className="note-stats-col">
              <div className='note-stat likes'>
                <div className="note-stat-icon-wrapper">
                  <i className="fa-solid fa-heart"></i>
                </div>
                <span>{note.likes.length}</span>
              </div>
              <div className="note-stat comments">
                <div className="note-stat-icon-wrapper">
                  <i className="fa-solid fa-comments"></i>
                </div>
                <span>{comments.length}</span>
              </div>
            </div>

            <div className="note-stats-col">
              <div className='note-stat updated-at'>
                <div className="note-stat-icon-wrapper">
                  <i className="fa-solid fa-pencil"></i>
                </div>
                <span>{moment(note.updatedAt).fromNow()}</span>
              </div>
              <div className='note-stat created-at'>
                <div className="note-stat-icon-wrapper">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <span>{moment(note.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
          {publicSwitch}
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
    if (isMobile) {
      headerContent = (
        <>
          <NoteShowTitleStatsLoaderMobile />
          <NoteShowTagsLoaderMobile />
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
      )}
    }
    
    return (
      <div className={'note-show-title'}>
        {headerContent}
      </div>
    )
}

export default NoteShowHeader;