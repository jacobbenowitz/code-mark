
import React from 'react';

const GlobalModal = ({ noteErrors, sessionErrors, userErrors }) => {
  function toggleSuccessModal() {
    const successModal = document.getElementById('success-modal');
    successModal.className = "success-in modal-on"
    setTimeout(() => successModal.className = "success-out", 4000)
    setTimeout(() => successModal.className = "modal-off", 5000)
  }

  function getIcon(errorType) {
    errorType === 'error' ?
      <i className="fa-solid fa-xmark"></i>
      : <i className="fa-solid fa-thumbs-up"></i>
  }

  return (
    <div id='success-modal' className='modal-off'>
      {/* {getIcon(error.key)} */}
      {/* <span>{error.value}</span> */}
    </div>
  )
}