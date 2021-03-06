import React from "react";
import { Link } from "react-router-dom";
import SectionTitleLoaderMobile from "../content_loaders/mobile/section_title_loader_mobile";
import HomeHeaderLoader from "../content_loaders/placeholder_components/home_header_loader";

const SectionTitle = ({ type, title,
  noteCount, filter, status, mobile = false }) => {
  
  let sectionTitleEle;
  if (status === 'BUSY' || noteCount === 0 && status === 'IDLE' || !status) {
    mobile ? (
      sectionTitleEle = (
        <div className='section-title'>
          <SectionTitleLoaderMobile />
        </div>
      )
    ) : (
      sectionTitleEle = (
        <div className='section-title'>
          <HomeHeaderLoader />
        </div>
      ) 
    )
  } else if (type === 'default' && status === 'DONE' && noteCount > 0) {
    sectionTitleEle = (
      <div className='section-title'>
        <h3>{title}</h3>
      </div>
    )
  } else if (type === 'filtered' && status === 'DONE') {
    sectionTitleEle = (
    <div className='section-title'>
      <h3>{title}</h3>
        <div className="subtitle-wrapper">
          <div className="filter-by">
            <span className="subtitle">Filtered by:</span>
            <span className="filter-tag">{filter}</span>
          </div>
          {noteCount === 1 ? (
            <div className="note-count">
              <span className="sub-white-right">{noteCount}</span>
              <span className="subtitle">Note found</span>
            </div>
          ) : (
            <div className="note-count">
              <span className="subtitle">Notes:</span>
                <span className="sub-white">{noteCount}</span>
            </div>
          )}
      </div>
      </div>
    )
  } else if (noteCount === 0 && status === 'DONE') {
    if (title === 'Following') {
      sectionTitleEle = (
        <div className = "none-found-message">
          <h3>Not following anyone 😞 </h3>
          <span>Go to the&nbsp;<Link className="link"
            to={'/discover'}>Discover</Link>&nbsp;section to find some new friends to follow 🫣
          </span>
        </div>
      )
    } else if (title === 'Discover') {
      sectionTitleEle = (
        <div className = "none-found-message">
          <h3>No notes found 😞 </h3>
            <span>
              Go to the Discover section to find some new friends to follow 🫣
            </span>
        </div>
      )
    } else if (title === 'Liked') {
      sectionTitleEle = (
        <div className = "none-found-message">
          <h3>No notes liked yet 😞 </h3>
            <span>
            You'll be sure to find some interesting CodeMarks in the&nbsp;<Link className="link"
              to={'/discover'}>Discover</Link>&nbsp;section. Go check it out, don't be shy 🙈
            </span>
        </div>
      )
    } else if (title === 'My Notes') {
      sectionTitleEle = (
        <div className="none-found-message">
          <h3>Welcome to CodeMark 👋 </h3>
          <span>
            Time to create your first note 🎉 ! Click on the new note form above to get started. Or, if you want to explore CodeMarks check out the&nbsp;<Link className="link"
              to={'/discover'}>Discover</Link>&nbsp;section.
          </span>
        </div>
      )
    } else {
      sectionTitleEle = (
        <div className = "none-found-message">
          <h3>No notes found 😞 </h3>
        </div>
      )
    }
  }
  
  return (
    <>
      {sectionTitleEle}
    </>
  )
}
export default SectionTitle;