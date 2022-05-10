import { connect } from 'react-redux';
import { fetchUserNotes } from '../../actions/note_actions';
import RecentNotes from './recent_notes';
// import { fetchRecentNotes } from '../../action/note_actions';

const mapStateToProps = state => {
  return {
    recentNotes: Object.values(state.notes.all)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: () => dispatch(fetchUserNotes())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentNotes);