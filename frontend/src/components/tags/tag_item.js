import React from "react";

const TagItem = props => (

  <div className="tag-item-wrapper">
    <div className="tag-icon-wrapper">
      <i className="fa-brands fa-js"></i>
    </div>
    <span className="tag-text">{props.title}</span>
  </div>

)

export default TagItem;