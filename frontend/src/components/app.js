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
import UserFilteredByTagContainer from './main/user_filtered_by_tag_container'
import LikedNotesContainer from './main/liked_notes_container';
import FollowingContainer from './main/following_container';
import FollowingFilteredContainer from './main/following_filtered_container';
import LikedFilteredContainer from './main/liked_filtered_container';
import LayoutDesign from './UI/layout_design';
import GlobalModalContainer from './UI/global_modal_container';
import TestLazyLoad from './content_loaders/test_lazy_load';
import NoteShowLazyLoad from './content_loaders/note_show_lazy_load';
import NotFound from './NotFound';


const App = () => (
  <div className="grid-pancake-stack">
    <header className="header-top-stack">
      <NavBarContainer />
    </header>
    <GlobalModalContainer />
    <Switch>
      <AuthRoute exact path='/signup'
        component={SignupFormContainer} />
      <AuthRoute exact path='/login'
        component={LoginFormContainer} />
      <ProtectedRoute exact path='/home'
        component={HomeContainer} />
      <ProtectedRoute exact path={'/notes/:noteId'}
        component={NoteShowContainer} />
      <ProtectedRoute exact path='/home/tags/:tag'
        component={HomeFilteredContainer} />
      <ProtectedRoute exact path='/users/:userId'
        component={UserFilteredContainer} />
      <ProtectedRoute exact path='/users/:userId/tags/:tag'
        component={UserFilteredByTagContainer} />
      <ProtectedRoute exact path='/discover'
        component={DiscoverContainer} />
      <ProtectedRoute exact path='/discover/tags/:tag'
        component={DiscoverFilteredContainer} />
      <ProtectedRoute exact path='/likes'
        component={LikedNotesContainer} />
      <ProtectedRoute exact path='/following'
        component={FollowingContainer} />
      <ProtectedRoute exact path='/following/tags/:tag'
        component={FollowingFilteredContainer} />
      <ProtectedRoute exact path='/likes/tags/:tag'
        component={LikedFilteredContainer} />
      <ProtectedRoute exact path='/settings'
        component={SettingsContainer} />
      <Route exact path='/dev/main-layout'
        component={LayoutDesign} />
      <Route exact path='/dev/home/lazy-load'
        component={TestLazyLoad} />
      <Route exact path='/dev/note/lazy-load'
        component={NoteShowLazyLoad} />
      <AuthRoute path="/"
        component={SplashPage} />
      <Route path="*"
        component={NotFound} />
    </Switch>

    <footer>
      <NavFooter />
    </footer>
  </div>
);

export default App;