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

export const orderNoteComments = (comments) => {
  return comments.sort(orderByDate);
}

export const selectNoteComments = (comments, noteId) => {
  
  return comments?.filter( comment => {
    return comment.note === noteId
  })
}