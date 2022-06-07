import React from "react";
import NoteResourcesListLoaderMobile from "./mobile/note_resources_list_loader_mobile";
import NoteShowCodeNoteLoaderMobile from "./mobile/note_show_code_note_loader_mobile";
import NoteShowResourcesLoaderMobile from "./mobile/note_show_resources_loader_mobile";
import NoteShowTagsLoaderMobile from "./mobile/note_show_tags_loader_mobile";
import NoteShowTitleStatsLoaderMobile from "./mobile/note_show_title_stats_loader_mobile";
import NoteShowTopLoaderMobile from "./mobile/note_show_top_loader_mobile";
import NoteShowActionIconsLoaderDesktop from "./desktop/note_show_action_icons_loader_desktop";
import NoteShowMainLoader from "./note_show_main_loader";
import NoteShowHeaderDesktopLoader from './desktop/note_show_header_loader_desktop'
import PublicSwitchLoader from "./placeholder_components/public_switch_loader";
import NoteResourcesListLoaderDesktop from "./mobile/note_resources_list_loader_desktop";

const NoteShowLazyLoad = () => {
  let headerContent, noteShowMain, noteResources;

  if (window.innerWidth < 680) {
    headerContent = (
      <>
        <NoteShowTitleStatsLoaderMobile />
        <NoteShowTagsLoaderMobile />
      </>
    )
    noteShowMain = (
      <NoteShowCodeNoteLoaderMobile />
    )
    noteResources = (
      <div className="resources-list">
        <NoteResourcesListLoaderMobile />
      </div>
    )
  } else {
    headerContent = (
      <div className="loader-wrapper">
        <NoteShowHeaderDesktopLoader />
      </div>
    )
    noteShowMain = (
      <NoteShowMainLoader />
    )
    noteResources = (
      <div className="resources-list">
        <NoteResourcesListLoaderDesktop />
      </div>
    )
  }
  
  return (
    
    <div className='note-show-wrapper grid-12-col'>
      <div className='grid-spacer-1-2' />
        <div className="note-show-container">
          <div className="note-show-top-icons">
            <NoteShowActionIconsLoaderDesktop />
          </div>
        
        <div id="note-show-main" className="note-show-main">
          {headerContent}
          {noteShowMain}
        </div>
          <div className="note-resources">
              {noteResources}
          </div>
          <div id="comments" className="note-comments">
            {/* implement on commentItem component */}
          </div>
        </div>
      <div className='grid-spacer-11-12' />
    
    </div>
  )
}

export default NoteShowLazyLoad;