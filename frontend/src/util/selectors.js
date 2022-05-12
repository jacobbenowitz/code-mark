function orderByDate(a, b) {
  if (a.updatedAt > b.updatedAt) {
    return -1;
  }
  if (a.updatedAt < b.updatedAt) {
    return 1;
  }
  return 0;
}

export const orderUserNotes = (notes) => {
  return notes.sort(orderByDate);
}

export const selectNoteComments = (comments, noteId) => {

  return comments?.filter(comment => {
    return comment.note === noteId
  })
}

export const selectNoteTags = notes => {
  const tags = notes.map(note => note.tags)
  debugger
  return tags.flat();
}

export const filterNotesByTag = (tag, notes) => {
  debugger
  return notes.filter(note => note.tags.includes(tag))
}