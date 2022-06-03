import React from 'react';
import { withRouter } from 'react-router-dom';
import { filterNotesByTag, orderUserNotes } from '../../util/selectors';
import CodeNoteItem from './code_note_item';
import AllNotes from '../main/all_notes';
import MobileNotes from '../main/mobile_notes';

class FilteredNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      filter: undefined,
      following: false
    };
  }
  
  isMobile() {
    return window.innerWidth < 680;
  }

  componentWillMount() {
    // this.props.userNotes ? this.render() :
    // this.props.fetchUserNotes(this.props.currentUser.id)
  };

  componentWillReceiveProps(nextState) {
    if (nextState.userNotes && nextState.filter !== this.state.filter) {
      let filtered = filterNotesByTag(nextState.filter, nextState.userNotes);
      this.setState({
        notes: orderUserNotes(filtered),
        filter: nextState.filter
      })
    }
  }


  render() {
    this.isMobile() ?
      <MobileNotes notes={this.state.notes} />
      : <AllNotes notes={this.state.notes} />
  }
}

export default withRouter(FilteredNotes);