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
  if (notes) {
    return notes.sort(orderByDate);
  }
}

export const orderNoteComments = (comments) => {
  if (comments) {
    return comments?.sort(orderByDate);
  }
}

export const selectNoteComments = (comments, noteId) => {
  if (comments) {
    return comments?.filter(comment => {
      return comment.note === noteId
    })
  }
}

export const selectNoteTags = notes => {
  if (notes) {
    const tags = notes.map(note => note.tags);
    const uniqueTags = [...new Set(tags.flat())]
    return uniqueTags;
  }
}

export const filterNotesByTag = (tag, notes) => {
  if (notes) {
    return notes.filter(note => note.tags.includes(tag))
  }
}

export const filterUsersByComment = (users, comment) => {
  if (users && comment) {
    return Object.values(users).filter(user =>
      user._id === comment.user)[0]
  }
}

export const filterOnlyPublicNotes = notes => {
  if (notes && Object.values(notes).length) {
    return notes.filter(note => note.public === true && note.sample === false)
  }
}

export const selectLikedNotes = (notes, likedIds) => {
  if (Object.values(notes).length) {
    return likedIds.map(id => notes[id])
  }
}

export const selectCommentsCount = (userNotes) => {
  const allComments = userNotes.map(note => note.comments)
  return allComments.flat().length;
}

export const filterUsersById = (allUsers, userIds) => {
  if (Object.values(allUsers).length) {
    return userIds.map(userId => allUsers[userId])
  }
}

export const selectFollowingUsersNotes = (users, allNotes) => {
debugger  
  if (allNotes && users) {
    const usersNoteIds = users.map(user => user?.notes).flat()
    const followingNotes = selectNotesById(usersNoteIds, allNotes)
    return followingNotes;
  }
}

export const selectNotesById = (noteIds, allNotes) => {
  const selectedNotes = noteIds.map(noteId => allNotes[noteId])
  const filteredNotes = selectedNotes.filter(note => !note.sample)
  return filteredNotes;
}