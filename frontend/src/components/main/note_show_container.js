
const mapStateToProps = (state, {match}) => {
  return {
    noteId: match.params.noteId,
    note: state.notes.all[match.params.noteId]
  }
}

const mapDispatchToProps = dispatch => {
  fetchNote
}