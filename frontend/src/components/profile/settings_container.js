import { connect } from 'react-redux';
import { fetchCurrentUser, logout } from '../../actions/session_actions';
import {
  fetchUser,
  updateUser,
  removeUser
} from '../../actions/user_actions';
import { toggleSuccessModal } from '../../util/modal_util';
import Settings from './settings';

const mapStateToProps = (state, { match }) => {
  return {
    currentUser: state.session.user,
    user: state.users.user,
    errors: state.errors.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    updateUser: userData => dispatch(updateUser(userData)),
    removeUser: userId => dispatch(removeUser(userId)),
    logout: () => logout(),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    toggleModal: () => dispatch(toggleSuccessModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);