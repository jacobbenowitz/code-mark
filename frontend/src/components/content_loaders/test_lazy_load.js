import React from "react";
import SidebarLoader from "./placeholder_components/sidebar_loader";
import NewNoteLoader from "./placeholder_components/new_note_loader";
import HomeHeaderLoader from "./placeholder_components/home_header_loader";
import CodeNoteItemLoader from "./placeholder_components/code_note_loader";
import UserNotesContainer from "../notes/user_notes_container";
import SectionTitle from "../UI/section_title";
import SectionTitleLoaderMobile from "./mobile/section_title_loader_mobile"
import TagsMobileLoader from "./mobile/tags_loader_mobile";
import NewNoteLoaderMobile from "./mobile/new_note_loader_mobile"
import NoteShowLazyLoad from "./note_show_lazy_load";
import ActionIconsLoader from "./note_show_action_icons_loader";
import NoteCommentsLoader from "./note_show_comments_loader";
import NoteShowActionIconsLoaderDesktop from "./desktop/note_show_action_icons_loader_desktop";
import NoteShowMainLoader from "./note_show_main_loader";
import NoteShowHeaderDesktopLoader from "./desktop/note_show_header_loader_desktop";
import PublicSwitchLoader from "./placeholder_components/public_switch_loader";

const TestLazyLoad = () => {
  function isMobile() {
    return window.innerWidth < 680;
  }
  return (
    <>
      {/* // HOME MOBILE  */}
      {/* <div className='main-mobile'>
        <div className='home-main'>
        <NewNoteLoaderMobile />
          <div className='notes-section'>
          <div className='section-title'>
            <SectionTitleLoaderMobile />
          </div>
            <div className='tags-wrapper-mobile'>
            <div className="code-note-tags-main">
              <TagsMobileLoader />
            </div>
            </div>
            <div className='note-list-container'>
            </div>
          </div>
        </div>
      </div> */}

      <div className='note-show-container'>
        <div className='note-show-top-icons-loader'>
          <NoteShowActionIconsLoaderDesktop />
        </div>
        <div className='note-show-main'>
          <div className={'note-show-title'}>
            <div className="loader-wrapper">
              <NoteShowHeaderDesktopLoader />
              <div className="public-loader">
                <PublicSwitchLoader />
              </div>
            </div>
          </div>
          <NoteShowMainLoader />
        </div>
        <div className='note-comments'>
          <NoteCommentsLoader />
        </div>
      </div>
    </>
  )
}

export default TestLazyLoad;