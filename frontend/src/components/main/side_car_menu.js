import React from 'react';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';

const SideCarMenu = ({ tags, tagType }) => {

  return (
    <div className='nav-sidecar'>
      <div className='nav-boxes'>
        <div className='nav-pages'>
          <h5>Pages</h5>
          <ul className='nav-list'>
            <NavLink to={'/home'} className='nav-item-container'>
              <div className='nav-item-link nav-home'>
                <img src="https://code-mark.s3.amazonaws.com/type%3DHome.svg" /> <span>Home</span>
              </div>
            </NavLink>
            <NavLink to={'/discover'} className='nav-item-container'>
              <div className='nav-item-link'>
                <img src="https://code-mark.s3.amazonaws.com/type%3DDiscover.svg" /> <span>Discover</span>
              </div>
            </NavLink>
            <NavLink to={'/following'} className='nav-item-container'>
              <div className='nav-item-link'>
                <img src="https://code-mark.s3.amazonaws.com/type%3DFollowing.svg" /> <span>Following</span>
              </div>
            </NavLink>
            <NavLink to={'/liked_notes'} className='nav-item-container'>
              <div className='nav-item-link'>
                <img src="https://code-mark.s3.amazonaws.com/type%3DFollowing.svg" /> <span>Liked</span>
              </div>
            </NavLink>
          </ul>
          <h5>Tags</h5>
          <ul className='nav-list'>
            {tags?.map((tag, i) =>
              <NavTagItem tagType={tagType} tag={tag} key={`${i}-tag`} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideCarMenu;