import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import SplashPage from './splash/splash_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import Footer from './nav/footer';
import '../stylesheets/reset.css';
import '../stylesheets/app.css';
import '../stylesheets/session.css';
import '../stylesheets/layout.css';
import '../stylesheets/typography.css';
import '../stylesheets/buttons.css';
import '../stylesheets/navbar.css';

const App = () => (
  <div className="grid-pancake-stack">
    <header className="header-top-stack">
      <NavBarContainer />
    </header>
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <AuthRoute exact path='/signup' component={SignupFormContainer} />
      {/* <ProtectedRoute exact path='/home' component={HomeContainer} /> */}
      {/* <ProtectedRoute exact path='/profile' component={ProfileContainer} /> */}
      {/* <ProtectedRoute exact path='/discover' component={DiscoverContainer} /> */}
      {/* <ProtectedRoute exact path='/following' component={FollowingContainer} /> */}
    </Switch>
    {/* <Footer /> */}
  </div>
);

export default App;