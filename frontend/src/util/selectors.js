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

export const filterOnlyPublicNotes = notes => {
  const filtered = notes.filter(note => note.public)
  return filtered;
}

export const selectLikedNotes = (notes, likedIds) => {
  return likedIds.map(id => notes[id])
}

export const selectCommentsCount = (userNotes) => {
  let allComments = userNotes.map(note => note.comments)
  debugger
  return allComments.flat().length;
}

export const selectFollowingNotes = (userIds, allNotes) => {
  let followingNotes = userIds.map(userId => 
      allNotes.userId === userId
  )
  return followingNotes;
}