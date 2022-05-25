import React from "react"
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const NavTagItem = props => (
  <div className='nav-item-link'>
    <img src="https://code-mark.s3.amazonaws.com/type%3Dcustom_tag.svg" /> <NavLink to={`/${props.tagType}/tags/${props.tag}`}>{props.tag}</NavLink>
  </div>
)

export default withRouter(NavTagItem);