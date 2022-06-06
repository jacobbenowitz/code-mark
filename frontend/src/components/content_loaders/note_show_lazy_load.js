import React from "react";
import NoteResourcesListLoaderMobile from "./mobile/note_resources_list_loader_mobile";
import NoteShowCodeNoteLoaderMobile from "./mobile/note_show_code_note_loader_mobile";
import NoteShowResourcesLoaderMobile from "./mobile/note_show_resources_loader_mobile";
import NoteShowTagsLoaderMobile from "./mobile/note_show_tags_loader_mobile";
import NoteShowTitleStatsLoaderMobile from "./mobile/note_show_title_stats_loader_mobile";
import NoteShowTopLoaderMobile from "./mobile/note_show_top_loader_mobile";

const NoteShowLazyLoad = () => {
  function isMobile() {
    return window.innerWidth < 680;
  }
  return (
    // HOME MOBILE 

    // NOTE SHOW MOBILE
    <>
      <div className='main-mobile'>
        <div className='home-main'>
        <div className="note-show-container span-12">
          <div className="note-show-top-icons">
            <NoteShowTopLoaderMobile />
          </div>
          <div id="note-show-main" className="note-show-main">
            <div className="note-show-title mobile">
              <NoteShowTitleStatsLoaderMobile />
              <div className="note-tags-list">
                <NoteShowTagsLoaderMobile />
              </div>
            </div>
            <div id="code-note-view" className="code-note-body">
              <NoteShowCodeNoteLoaderMobile />
            </div>
          </div>
          <div className="note-resources">
            <NoteShowResourcesLoaderMobile />
            <div className="resources-list"> 
              <NoteResourcesListLoaderMobile />
            </div>
          </div>
          <div id="comments" className="note-comments">
            {/* implement on commentItem component */}
          </div>
        </div>
        </div>
    </div>
    
    </>
  )
}

export default NoteShowLazyLoad;