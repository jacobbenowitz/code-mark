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

  
  componentDidUpdate() {
    const mobileStatus = this.isMobile();
    const { status, userNotes } = this.props;

    if (status !== this.state.status || userNotes !== this.state.userNotes) {
      let notes = orderUserNotes(userNotes)
      this.setState({
        userNotes: notes,
        status: status
      })
    }
    if (this.state.mobile !== mobileStatus) {
      this.setState({ mobile: mobileStatus })
    }
  }
  

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    const { mobile, userNotes, status } = this.state;

    return (
      <>
        {  mobile ?
          <MobileNotes
            notes={userNotes}
            status={status}
          />
          :
          <AllNotes
            notes={userNotes}
            status={status}
          />
        }
      </>
    )
  }
}

export default UserNotes;