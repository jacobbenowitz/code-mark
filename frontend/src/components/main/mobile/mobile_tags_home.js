import React from "react";
import { NavLink } from "react-router-dom";

const MobileTagsHome = ({tags}) => (
  <div className='tags-wrapper-mobile'>
    <span className='tags-mobile-header'>
      Tags
    </span>

    <div className="code-note-tags-main">
      {tags.map((tag, i) =>
        <NavLink to={`/home/tags/${tag}`} key={`${i}-tag`}>
          <div className="note-tag-mini nav-link">
            {tag}
          </div>
        </NavLink>
      )}
      <div className='tag-spacer'></div>
    </div>

  </div>
)

export default MobileTagsHome;