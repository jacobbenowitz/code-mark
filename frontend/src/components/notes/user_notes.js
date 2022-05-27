import React from 'react';
import { withRouter } from 'react-router-dom';
import { orderUserNotes } from '../../util/selectors';
import CodeNoteItem from './code_note_item';
import AllNotes from '../main/all_notes';
import MobileNotes from '../main/mobile_notes';

class UserNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNotes: []
    };
  }

  componentWillMount() {
    debugger
    this.props.fetchUserNotes(this.props.currentUser?._id)
  };

  componentWillReceiveProps(nextState) {
    if (nextState.userNotes) {
      this.setState({
        userNotes: orderUserNotes(nextState.userNotes)
      })
    }
  }

  isMobile(){
    return window.innerWidth < 600;
  }

  render() {
    if (this.state.userNotes.length === 0) {
      return (<span>No notes found :(</span>)
    } else {
      return (
        this.isMobile() ?
          <MobileNotes notes={this.state.userNotes} />
          : <AllNotes notes={this.state.userNotes} />
      )
    }
  }
}

export default UserNotes;