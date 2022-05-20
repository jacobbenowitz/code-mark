function orderByDate(a, b) {
  if (a?.updatedAt > b?.updatedAt) {
    return -1;
  }
  if (a?.updatedAt < b?.updatedAt) {
    return 1;
  }
  return 0;
}

export const orderUserNotes = (notes) => {
  return notes.sort(orderByDate);
}

export const orderNoteComments = (comments) => {
  return comments?.sort(orderByDate);
}

export const selectNoteComments = (comments, noteId) => {

  return comments?.filter(comment => {
    return comment.note === noteId
  })
}

export const selectNoteTags = notes => {
  const tags = notes.map(note => note.tags);
  const uniqueTags = [...new Set(tags.flat())]
  return uniqueTags;
}

export const filterNotesByTag = (tag, notes) => {
  return notes.filter(note => note.tags.includes(tag))
}

export const filterUsersByComment = (users, comment) => {
  return Object.values(users)?.filter(user => user._id === comment.user)[0]
}