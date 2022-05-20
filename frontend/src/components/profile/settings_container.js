
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import {
  fetchUser,
  updateUser,
  removeUser
} from '../../actions/user_actions';
import Settings from './settings';

const mapStateToProps = (state, { match }) => {
  return {
    currentUser: state.session.user,
    user: state.users.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    updateUser: userData => dispatch(updateUser(userData)),
    removeUser: userId => dispatch(removeUser(userId)),
    logout: () => logout(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);