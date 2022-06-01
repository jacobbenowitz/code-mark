import React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../profile/avatar";
import AvatarForm from "../profile/avatar_form";

export default class MobileNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
    this.toggleShowMenu = this.toggleShowMenu.bind(this)
  }

  toggleShowMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }


  render() {

    return (
      <nav>
        <div className={'menu-wrapper'}
          onClick={() => this.toggleShowMenu()}>
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
        <div className={this.state.showMenu ? 'nav-menu-mobile menu-in' : 'nav-menu-mobile menu-out'}
          onClick={() => this.toggleShowMenu()}
        >
          <div className='nav-boxes'>
            <div className='nav-pages'>
              <ul className='nav-list'>
                <h5>Account</h5>
                <NavLink className="settings nav-item-container"
                  to={'/settings'}>
                  <div className='nav-item-link settings'>
                    <span>Settings</span>
                  </div>
                </NavLink>
                <div className="logout nav-item-container"
                  onClick={() => this.props.logout()}>
                  <div className='nav-item-link nav-home'>
                    <span>Logout</span>
                  </div>
                </div>
              </ul>
            </div>
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
            </div>
          </div>
          <div className="avatar-mobile">
            <AvatarForm
              username={this.props.currentUser?.username}
              color={this.props.currentUser?.color}
            />
          </div>
        </div>
        <div className={this.state.showMenu ? 'mobile-menu-mask mask-in' : 'mobile-menu-mask mask-out'}
          onClick={() => this.toggleShowMenu()}
        />
      </nav>
    )
  }
}