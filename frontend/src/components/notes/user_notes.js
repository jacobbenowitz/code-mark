import React from 'react';
import { withRouter } from 'react-router-dom';
import { orderUserNotes } from '../../util/selectors';
import CodeNoteItem from './code_note_item';

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


  render() {
    if (this.state.userNotes.length === 0) {
      return (<span>No notes found :(</span>)
    } else {
      return (
        this.state.userNotes.map((note) => (
          <CodeNoteItem key={note._id}
            title={note.title}
            tags={note.tags}
            textDetails={note.textdetails}
            codeBody={note.codebody}
            id={note._id}
          />
        ))
      )
    }
  }
}

export default withRouter(UserNotes);