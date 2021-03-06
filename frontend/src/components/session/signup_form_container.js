import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
// import { toggleSuccessModal } from '../../util/modal_util';
import SignupForm from './signup_form';

const mapStateToProps = state => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
    loginGuest: user => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);