// configure Auth and Protected routes
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to='/home' /> // go to home if user is authenticated
    )
  )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => loggedIn ? (
    <Component {...props} />
  ) : (
    <Redirect to='/login' />
  )} />
);

// use isAuthenticated slice to determine if user is loggedIn
const mapStateToProps = state => (
  { loggedIn: state.session.isAuthenticated }
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));