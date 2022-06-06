import React from 'react';

import AllNotes from '../main/all_notes';
import MobileNotes from '../main/mobile_notes';

const FilteredNotes = ({ notes, status, mobile }) => {
  
  let notesContainer;

  if (mobile) {
    notesContainer = (
      <MobileNotes
        notes={notes}
        status={status}
      />
    )
  } else {
    notesContainer = (
      <AllNotes
        notes={notes}
        status={status}
      />
    )
  }
  return (
    <>
      {notesContainer}
    </>
  )
}

export default FilteredNotes;