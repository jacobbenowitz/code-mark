import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { toggleSuccessModal } from '../../util/modal_util';
import LoginForm from './login_form';

const mapStateToProps = state => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    loginGuest: user => dispatch(login(user)),
    toggleModal: () => dispatch(toggleSuccessModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);