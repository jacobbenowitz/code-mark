import React from "react";

const TagItemTest = props => (

  <div className="tag-item-wrapper">
    <div className="tag-icon-wrapper">
      <i className="fa-brands fa-js"></i>
    </div>
    <span className="tag-text">Test</span>
    {/* <span className="tag-text">{props.tag.title}</span> */}
  </div>

)

export default TagItemTest;