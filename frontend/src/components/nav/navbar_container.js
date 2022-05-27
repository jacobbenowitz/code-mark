import { connect } from 'react-redux';
import { fetchCurrentUser, logout } from '../../actions/session_actions';
import NavBar from './navbar';

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);