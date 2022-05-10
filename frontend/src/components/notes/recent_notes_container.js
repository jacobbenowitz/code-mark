import { connect } from 'react-redux';
import { fetchUserNotes } from '../../actions/note_actions';
import RecentNotes from './recent_notes';

const mapStateToProps = state => {
  return {
    newNote: state.notes.new
  }
};

export default connect(mapStateToProps)(RecentNotes);