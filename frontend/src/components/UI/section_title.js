import React from "react";

const SectionTitle = ({ type, title, noteCount, filter }) => {
  let sectionTitleEle;
  if (type === 'default') {
    return (
      <div className='section-title'>
        <h3>{title}</h3>
        {/* {noteCount === 1 ? (
          <div className="note-count">
            <span className="sub-white-right">{noteCount}</span>
            <span className="subtitle">Note</span>
          </div>
        ) : (
          <div className="note-count">
            <span className="subtitle">Notes:</span>
            <span className="sub-white">{noteCount}</span>
          </div>
        )} */}
      </div>
    )
  }
  if (type === 'filtered') {
    return (
    <div className='section-title'>
      <h3>{title}</h3>
        <div className="subtitle-wrapper">
          {noteCount === 1 ? (
            <div className="note-count">
              <span className="sub-white-right">{noteCount}</span>
              <span className="subtitle">Note</span>
            </div>
          ) : (
            <div className="note-count">
              <span className="subtitle">Notes:</span>
                <span className="sub-white">{noteCount}</span>
            </div>
          )}
        <div className="filter-by">
          <span className="subtitle">Filtered By:</span>
          <span className="sub-white">{filter}</span>
        </div>
      </div>
      </div>
    )
  }
}
export default SectionTitle;