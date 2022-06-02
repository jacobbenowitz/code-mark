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

  componentDidMount() {
    this.props.fetchUserNotes(this.props.currentUser?.id)
    debugger
  };
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.userNotes) {
      let notes = orderUserNotes(nextProps.userNotes);
      debugger
      this.setState({
        userNotes: notes
      })
    }
  }

  isMobile(){
    return window.innerWidth < 680;
  }

  render() {
    debugger
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