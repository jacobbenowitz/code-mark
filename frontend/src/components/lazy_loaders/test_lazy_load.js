import React from "react";
import SidebarLoader from "./placeholder_components/sidebar_loader";
import NewNoteLoader from "./placeholder_components/new_note_loader";
import HomeHeaderLoader from "./placeholder_components/home_header_loader";
import CodeNoteItemLoader from "./placeholder_components/code_note_loader";
import NoteShowTopLoader from "./note_show_top_loader";

const TestLazyLoad = () => {
  function isMobile() {
    return window.innerWidth < 680;
  }

  if (isMobile()) {
    return (
      <div className='main-mobile'>
        <div className='home-main'>
          {/* <NewNoteContainer /> */}
          <div className='notes-section'>
            {/* <SectionTitle
              title={'My Notes'}
              noteCount={this.props?.userNotes.length}
              type={'default'}
            /> */}
            <div className='tags-wrapper-mobile'>
              <span className='tags-mobile-header'>Tags</span>
              <div className="code-note-tags-main">
                {/* {this.props.tags?.map((tag, i) =>
                  <NavLink to={`/home/tags/${tag}`}>
                    <div className="note-tag-mini link"
                      key={`${i}-tag`}>
                      {tag}
                    </div>
                  </NavLink>
                )} */}
                <div className='tag-spacer'></div>
              </div>
            </div>
            {/* <div className='note-list-container'>
              <UserNotesContainer />
            </div> */}
          </div>
        </div>
      </div>
    )
  } else return (
    <div className='main-sidebar'>
      <div className='nav-sidecar'>
        <div className="nav-boxes">
          <SidebarLoader />
        </div>
      </div>
      <div className='home-main'>
        <div className='new-note-form' >
          <NewNoteLoader />
        </div>
        <div className='notes-section'>
          <HomeHeaderLoader />
          <div className='note-list-container'>
            <div className='desktop-notes'>
              <div className='column1'>
                <CodeNoteItemLoader />
                <CodeNoteItemLoader />
                <CodeNoteItemLoader />
              </div>
              <div className='column2'>
                <CodeNoteItemLoader />
                <CodeNoteItemLoader />
              </div>
            </div>
          </div>
        </div>
        <NoteShowTopLoader />
      </div>
    </div>
    )
}

export default TestLazyLoad;