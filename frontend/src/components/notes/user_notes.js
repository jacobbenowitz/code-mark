import React from 'react';
import { withRouter } from 'react-router-dom';
import { orderUserNotes } from '../../util/selectors';
import CodeNoteItem from './code_note_item';
import AllNotes from '../main/all_notes';
import MobileNotes from '../main/mobile_notes';
import CodeNoteItemLoader from '../lazy_loaders/placeholder_components/code_note_loader';

class UserNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNotes: []
    };
  }

  componentDidMount() {
    this.props.fetchUserNotes(this.props.currentUser?.id)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userNotes) {
      let notes = orderUserNotes(nextProps.userNotes);
      this.setState({
        userNotes: notes
      })
    }
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    return (
      this.isMobile() ?
        <MobileNotes notes={this.state.userNotes} />
        : <AllNotes notes={this.state.userNotes} />
    )
    // }
  }
}

export default UserNotes;