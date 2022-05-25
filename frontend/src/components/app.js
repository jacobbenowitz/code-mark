import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import SplashPage from './splash/splash_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavFooter from "./nav/footer";
import SettingsContainer from './profile/settings_container';
import Footer from './nav/footer';
import '../stylesheets/reset.css';
import '../stylesheets/app.css';
import '../stylesheets/session.css';
import '../stylesheets/layout.css';
import '../stylesheets/allstyles.css';
import '../stylesheets/typography.css';
import '../stylesheets/navbar.css';
import '../stylesheets/note_form/note_form.css';
import '../stylesheets/main/home.css'
import NoteShowContainer from './main/note_show_container';
import HomeContainer from './main/home_container';
import HomeFilteredContainer from './main/home_filtered_container';
import DiscoverContainer from './main/discover_container';
import DiscoverFilteredContainer from './main/discover_filtered_container';
import UserFilteredContainer from './main/user_filtered_container';
import LikedNotesContainer from './main/liked_notes_container';
import FollowingContainer from './main/following_container';
import FollowingFilteredContainer from './main/following_filtered_container';


const App = () => (
  <div className="grid-pancake-stack">
    <header className="header-top-stack">
      <NavBarContainer />
    </header>

    <Switch>
      <AuthRoute exact path='/signup'
        component={SignupFormContainer} />
      <AuthRoute exact path='/login'
        component={LoginFormContainer} />
      <ProtectedRoute exact path='/home'
        component={HomeContainer} />
      <ProtectedRoute exact path={'/notes/:noteId'}
        component={NoteShowContainer} />
      <ProtectedRoute path='/home/tags/:tag'
        component={HomeFilteredContainer} />
      <ProtectedRoute path='/users/:userId'
        component={UserFilteredContainer} />
      <ProtectedRoute exact path='/discover'
        component={DiscoverContainer} />
      <ProtectedRoute exact path='/discover/tags/:tag'
        component={DiscoverFilteredContainer} />
      <ProtectedRoute exact path='/liked_notes'
        component={LikedNotesContainer} />
      <ProtectedRoute exact path='/following'
        component={FollowingContainer} />
      <ProtectedRoute exact path='/following/tags/:tag'
        component={FollowingFilteredContainer} />
      <ProtectedRoute exact path='/settings'
        component={SettingsContainer} />
      <AuthRoute path="/"
        component={SplashPage} />
    </Switch>

    <footer className="grid-bottom-stack">
      <NavFooter />
    </footer>
  </div>
);

export default App;