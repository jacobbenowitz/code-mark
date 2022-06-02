function orderByDate(a, b) {
  if (a?.createdAt > b?.createdAt) {
    return -1;
  }
  if (a?.createdAt < b?.createdAt) {
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
  const filtered = notes.filter(note => note.public === true)
  debugger
  return filtered;
}

export const selectLikedNotes = (notes, likedIds) => {
  return likedIds.map(id => notes[id])
}

export const selectCommentsCount = (userNotes) => {

  const allComments = userNotes.map(note => note.comments)
  return allComments.flat().length;
}

export const filterUsersById = (allUsers, userIds) => {
  return userIds.map(userId => allUsers[userId])
}

export const selectFollowingUsersNotes = (users, allNotes) => {
  const usersNoteIds = users.map(user => user?.notes).flat()
  const followingNotes = selectNotesById(usersNoteIds, allNotes)
  return followingNotes;
}

export const selectNotesById = (noteIds, allNotes) => {
  const filteredNotes = noteIds.map(noteId => allNotes[noteId])
  return filteredNotes;
}