
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import Settings from './settings';

const mapStateToProps = (state, { match }) => {
  return {
    currentUser: state.session.user,
    user: state.users.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);