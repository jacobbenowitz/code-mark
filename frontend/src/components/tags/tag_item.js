import React from "react";

const TagItem = props => (
  <div className="tag-item-wrapper">
    <div className="tag-icon-wrapper">
      <i class="fa-solid fa-tag"></i>
    </div>
    <span className="tag-text">{props.title}</span>
  </div>
)

export default TagItem;