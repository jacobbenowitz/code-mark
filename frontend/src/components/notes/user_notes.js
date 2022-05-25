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
    this.props.fetchUserNotes(this.props.currentUser.id)
  };

  componentWillReceiveProps(nextState) {
    if (nextState.userNotes) {
      this.setState({
        userNotes: orderUserNotes(nextState.userNotes)
      })
    }
  }

  isMobile(){
    // debugger;
    return window.innerWidth < 600;
  }

  render() {
    if (this.state.userNotes.length === 0) {
      return (<span>No notes found :(</span>)
    } else {
      return (
        // this.state.userNotes?.map((note) => (
        //   <CodeNoteItem key={note._id}
        //     title={note.title}
        //     likes={note.likes}
        //     tags={note.tags}
        //     username={note.user.username}
        //     userId={note.user.userId}
        //     comments={note.comments}
        //     textDetails={note.textdetails}
        //     codeBody={note.codebody}
        //     id={note._id}
        //     createdAt={note.createdAt}
        //   />
        // ))
        this.isMobile() ?
          <MobileNotes notes={this.state.userNotes} />
          : <AllNotes notes={this.state.userNotes} />
      )
    }
  }
}

export default UserNotes;