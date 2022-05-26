import React from "react";
import UserNotesContainer from "../notes/user_notes_container";
import SideCarMenu from "../main/side_car_menu";
import NewNoteContainer from "../code_editor/new_note_container";
import { NavLink } from "react-router-dom";
import CodeNotePlaceholder from "../notes/code_note_placeholders/code_note_item_placeholder";

const LayoutDesign = () => {
  if (window.innerWidth > 600) {
    return (
      <div className='main-sidebar'>
        <div className='nav-sidecar'>
          <div className='nav-boxes'>
            <div className='nav-pages'>
              <h5>Pages</h5>
              <ul className='nav-list'>
                <NavLink to={'/dev/main-layout'} className='nav-item-container'>
                  <div className='nav-item-link nav-home'>
                    <img src="https://code-mark.s3.amazonaws.com/type%3DHome.svg" /> <span>Main Layout</span>
                  </div>
                </NavLink>
              </ul>
              <h5>Tags</h5>
              <ul className='nav-list'>
                <NavLink to={'/dev/main-layout'} className='nav-item-container'>
                  <div className='nav-item-link nav-home'>
                    <img src="https://code-mark.s3.amazonaws.com/type%3DHome.svg" /> <span>Main Layout</span>
                  </div>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
        <div className='home-main'>
          <div className='new-note-container'>
            <div className="test-note-spacer"></div>
          </div>
          <div className='notes-section'>
            <div className='section-title'>
              <h3>Layout Testing</h3>
            </div>
            <div className='note-list-container'>
              <div className='desktop-notes'>
                <div className='column1'>
                  <div className="code-note-item">
                    <CodeNotePlaceholder />
                  </div>
                  <div className="code-note-item">
                    <CodeNotePlaceholder />
                  </div>
                  <div className="code-note-item">
                    <CodeNotePlaceholder />
                  </div>
                </div>
                <div className='column2'>
                  <div className="code-note-item">
                    <CodeNotePlaceholder />
                  </div>
                  <div className="code-note-item">
                    <CodeNotePlaceholder />
                  </div>
                  <div className="code-note-item">
                    <CodeNotePlaceholder />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return (
      <div className='main-mobile'>
        <div className='home-main'>
          <div className='new-note-container'>
            <div className="test-note-spacer"></div>
          </div>
          <div className='notes-section'>
            <div className='section-title'>
              <h3>Layout Testing</h3>
            </div>
            <div className='note-list-container'>
              <div className='mobile-notes'>
                <div className="code-note-item">
                  <CodeNotePlaceholder />
                </div>
                <div className="code-note-item">
                  <CodeNotePlaceholder />
                </div>
                <div className="code-note-item">
                  <CodeNotePlaceholder />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default LayoutDesign;