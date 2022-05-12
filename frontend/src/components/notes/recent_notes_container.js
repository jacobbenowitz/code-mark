import { connect } from 'react-redux';
import { fetchUserNotes } from '../../actions/note_actions';
import RecentNotes from './recent_notes';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    newNote: state.notes.new
  }
};

export default withRouter(connect(mapStateToProps)(RecentNotes));