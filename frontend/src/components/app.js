import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import SplashPage from './splash/splash_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavFooter from "./nav/footer";
import ProfileContainer from './profile/profile_container';
import Footer from './nav/footer';
import Home from './main/home';
import '../stylesheets/reset.css';
import '../stylesheets/app.css';
import '../stylesheets/session.css';
import '../stylesheets/layout.css';
import '../stylesheets/allstyles.css';
import '../stylesheets/typography.css';
import '../stylesheets/navbar.css';
import '../stylesheets/note_form/note_form.css';
import '../stylesheets/main/home.css'

const App = () => (
  <div className="grid-pancake-stack">
    <header className="header-top-stack">
      <NavBarContainer />
    </header>
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <AuthRoute exact path='/signup' component={SignupFormContainer} />
      <ProtectedRoute exact path='/home' component={Home} />
      {/* <ProtectedRoute exact path='/profile' component={ProfileContainer} /> */}
      {/* <ProtectedRoute exact path='/discover' component={DiscoverContainer} /> */}
      {/* <ProtectedRoute exact path='/following' component={FollowingContainer} /> */}
    </Switch>
    <footer className="grid-bottom-stack">
      <NavFooter />
    </footer>
  </div>
);

export default App;