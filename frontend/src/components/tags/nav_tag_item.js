import React from "react"

const NavTagItem = ({ tag, filterByTag }) => (
  <div className='nav-item-link'>
    <img src="https://code-mark.s3.amazonaws.com/type%3Dcustom_tag.svg" /> <span>{tag}</span>
  </div>
)

export default NavTagItem;