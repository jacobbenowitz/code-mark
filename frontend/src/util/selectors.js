function orderByDate(a, b) {
  debugger
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