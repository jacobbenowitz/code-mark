import React from 'react';
import { withRouter } from 'react-router-dom';
import CodeNoteItem from './code_note_item';

class RecentNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentNotes: []
    };
  }

  componentWillMount() {
    this.props.fetchUserNotes()
  };

  componentWillReceiveProps(nextState) {
    this.setState({
      notes: nextState.notes
    })
  }


  render() {
    if (this.state.recentNotes.length < 1) {
      return (<span>No notes found :(</span>)
    } else {
      return (
        this.state.recentNotes.map(note => (
          <CodeNoteItem key={note._id}
            title={note.title}
            textDetails={note.textdetails}
            codeBody={note.codebody}
          />
        ))
      )
    }
  }
}

export default withRouter(RecentNotes);