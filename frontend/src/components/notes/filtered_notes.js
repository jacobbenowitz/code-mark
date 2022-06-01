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
    return window.innerWidth < 600;
  }

  componentWillMount() {
    // this.props.userNotes ? this.render() :
    // this.props.fetchUserNotes(this.props.currentUser.id)
  };

  componentWillReceiveProps(nextState) {
    // debugger
    if (nextState.userNotes && nextState.filter !== this.state.filter) {
      let filtered = filterNotesByTag(nextState.filter, nextState.userNotes);
      this.setState({
        notes: orderUserNotes(filtered),
        filter: nextState.filter
      })
    }
  }


  render() {
    // 
    if (this.state.notes.length === 0) {
      return (<span>No notes found</span>)
    } else {
      return (
        // this.state.notes.map(note =>
        //   <CodeNoteItem key={note._id}
        //     likes={note.likes}
        //     title={note.title}
        //     username={note.user.username}
        //     userId={note.user.userId}
        //     tags={note.tags}
        //     textDetails={note.textdetails}
        //     codeBody={note.codebody}
        //     id={note._id}
        //     createdAt={note.createdAt}
        //   />
        // )
        this.isMobile() ?
          <MobileNotes notes={this.state.notes} />
          : <AllNotes notes={this.state.notes} />
      )
    }
  }
}

export default withRouter(FilteredNotes);