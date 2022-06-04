import React from "react";
import SidebarLoader from "./placeholder_components/sidebar_loader";
import NewNoteLoader from "./placeholder_components/new_note_loader";
import HomeHeaderLoader from "./placeholder_components/home_header_loader";
import CodeNoteItemLoader from "./placeholder_components/code_note_loader";
import NoteShowTopLoader from "./note_show_top_loader";
import UserNotesContainer from "../notes/user_notes_container";
import SectionTitle from "../UI/section_title";
import SectionTitleLoaderMobile from "../lazy_loaders/mobile/section_title_loader_mobile"
import TagsMobileLoader from "./mobile/tags_loader_mobile";
import NewNoteLoaderMobile from "./mobile/new_note_loader_mobile"

const TestLazyLoad = () => {
  function isMobile() {
    return window.innerWidth < 680;
  }
  return (
    // HOME MOBILE 
      <div className='main-mobile'>
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
    </div>

    // NOTE SHOW MOBILE
  )
}

export default TestLazyLoad;