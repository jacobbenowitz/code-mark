import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarLoader from '../content_loaders/placeholder_components/sidebar_loader';
import NavTagItem from '../tags/nav_tag_item';

const SideCarMenu = ({ tags, tagType, status }) => {
  let navBoxes;

  if (status === 'BUSY' || status === 'IDLE'){
    navBoxes = (
        <div className='nav-boxes'>
            <SidebarLoader />
        </div>
    )
  } else if (status === 'DONE'){
    if (tags){
      navBoxes = (
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
                <NavLink to={'/likes'} className='nav-item-container'>
                  <div className='nav-item-link'>
                    <img src="https://code-mark.s3.amazonaws.com/type%3DFollowing.svg" /> <span>Liked</span>
                  </div>
                </NavLink>
              </ul>
              {tags.length ? (
              <>
                <h5>Tags</h5>
                <div className='nav-list-wrapper'>
                  <div className='nav-list tags-list'>
                    {tags?.map((tag, i) =>
                      <NavTagItem tagType={tagType} tag={tag} key={`${i}-tag`} />)}
                    { <div className='stopper-wrapper'>
                      <div className='gradient-stopper' />
                    </div> }
                    <div className='spacer-50-h'></div>
                  </div>
                </div>
              </>
            ) : <div  className='spacer-30-h'></div>} 
            </div>
          </div>
      )
    } 
  } else {
    navBoxes = (
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
              <NavLink to={'/likes'} className='nav-item-container'>
                <div className='nav-item-link'>
                  <img src="https://code-mark.s3.amazonaws.com/type%3DFollowing.svg" /> <span>Liked</span>
                </div>
              </NavLink>
            </ul>
            <div className='spacer-30-h'></div>
          </div>
        </div>
    )
  }

  return (
    <div className='nav-sidecar'>
      {navBoxes}
    </div>
  )
}

export default SideCarMenu;