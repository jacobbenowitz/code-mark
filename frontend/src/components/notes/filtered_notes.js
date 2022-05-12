import React from 'react';
import { withRouter } from 'react-router-dom';
import { filterNotesByTag, orderUserNotes } from '../../util/selectors';
import CodeNoteItem from './code_note_item';

class FilteredNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      filter: undefined
    };
  }

  componentWillMount() {
    // this.props.userNotes ? this.render() :
    this.props.fetchUserNotes(this.props.currentUser.id)
  };

  componentWillReceiveProps(nextState) {
    if (nextState.userNotes && nextState.filter !== this.state.filter) {
      //debugger
      let filtered = filterNotesByTag(nextState.filter, nextState.userNotes);
      this.setState({
        notes: orderUserNotes(filtered),
        filter: nextState.filter
      })
    }
  }


  render() {
    //debugger
    if (this.state.notes.length === 0) {
      return (<span>No notes found</span>)
    } else {
      return (
        this.state.notes.map(note =>
          <CodeNoteItem key={note._id}
            title={note.title}
            tags={note.tags}
            textDetails={note.textdetails}
            codeBody={note.codebody}
            id={note._id}
          />
        )
      )
    }
  }
}

export default withRouter(FilteredNotes);