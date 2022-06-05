import React from 'react';
import { withRouter } from 'react-router-dom';
import { orderUserNotes } from '../../util/selectors';
import CodeNoteItem from './code_note_item';
import AllNotes from '../main/all_notes';
import MobileNotes from '../main/mobile_notes';
import CodeNoteItemLoader from '../content_loaders/placeholder_components/code_note_loader';

class UserNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNotes: [],
      status: 'IDLE'
    };
  }

  componentDidMount() {
    this.props.fetchUserNotes(this.props.currentUser?.id)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.state.status) {
      let notes = orderUserNotes(nextProps.userNotes)
      this.setState({
        userNotes: notes,
        status: nextProps.status
      })
    }
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    return (
      this.isMobile() ?
        <MobileNotes
          notes={this.state.userNotes}
          status={this.state.status}
        />
        :
        <AllNotes
          notes={this.state.userNotes}
          status={this.state.status}
        />
    )
  }
}

export default UserNotes;