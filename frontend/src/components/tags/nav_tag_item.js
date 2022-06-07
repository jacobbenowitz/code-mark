import React from "react"
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const NavTagItem = ({ tagType, tag }) => {

  return (
    <NavLink to={`/${tagType}/tags/${tag}`}
      className='nav-item-container'
    >
      <div className='nav-item-link'>
        <img src="https://code-mark.s3.amazonaws.com/type%3Dcustom_tag.svg" />
        <span>{tag}</span>
      </div>
    </NavLink>
  )

}
export default withRouter(NavTagItem);