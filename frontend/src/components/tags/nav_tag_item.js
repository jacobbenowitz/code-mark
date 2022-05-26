import React from "react"
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const NavTagItem = props => (
  <NavLink to={`/${props.tagType}/tags/${props.tag}`}>
    <div className='nav-item-link'>
      <img src="https://code-mark.s3.amazonaws.com/type%3Dcustom_tag.svg" />
      <span>{props.tag}</span>
    </div>
  </NavLink>
)

export default withRouter(NavTagItem);