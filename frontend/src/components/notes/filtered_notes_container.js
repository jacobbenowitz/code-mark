import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserNotes } from '../../actions/note_actions';
import FilteredNotes from './filtered_notes';

const mapStateToProps = (state, { match }) => {
  return {
    userNotes: state.notes.user,
    currentUser: state.session.user,
    filter: match.params.tag
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: userId => dispatch(fetchUserNotes(userId))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilteredNotes))