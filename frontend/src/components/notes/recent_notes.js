import React from 'react';
import { withRouter } from 'react-router-dom';
import CodeNoteItem from './code_note_item';

class RecentNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: undefined
    };
  }

  componentWillReceiveProps(nextState) {
    // debugger
    this.setState({
      note: nextState.newNote
    })
  }

  render() {
    return this.state.note ? (
      <CodeNoteItem key={this.state.note._id}
        id={this.state.note._id}
        title={this.state.note.title}
        textDetails={this.state.note.textdetails}
        codeBody={this.state.note.codebody}
      />
    ) : (
      <span>No recent notes</span>
    )
  }
}

export default withRouter(RecentNotes);