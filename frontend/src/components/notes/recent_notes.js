import React from 'react';
import CodeNoteItem from './code_note_item';

class RecentNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: undefined
    };
  }

  componentWillReceiveProps(nextState) {
    this.setState({
      note: nextState.newNote
    })
  }

  render() {
    return this.state.note ? (
      <CodeNoteItem key={this.state.note._id}
        id={this.state.note._id}
        tags={this.state.note.tags}
        title={this.state.note.title}
        textDetails={this.state.note.textdetails}
        codeBody={this.state.note.codebody}
      />
    ) : (
      <span>No recent notes</span>
    )
  }
}

export default RecentNotes;