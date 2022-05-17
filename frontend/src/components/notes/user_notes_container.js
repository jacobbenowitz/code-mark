import { connect } from 'react-redux';
import { fetchUserNotes } from '../../actions/note_actions';
import UserNotes from './user_notes';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    userNotes: Object.values(state.notes.user),
    currentUser: state.session.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: userId => dispatch(fetchUserNotes(userId))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserNotes));