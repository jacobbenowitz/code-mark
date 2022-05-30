import React from 'react';

const GlobalModal = ({ noteErrors, sessionErrors, userErrors }) => {
  // function toggleSuccessModal() {
  //   const successModal = document.getElementById('success-modal');
  //   successModal.className = "success-in modal-on"
  //   setTimeout(() => successModal.className = "success-out", 4000)
  //   setTimeout(() => successModal.className = "modal-off", 5000)
  // }

  function getIcon(errorType) {
    return errorType === 'error' ?
      <i className="fa-solid fa-xmark"></i>
      : <i className="fa-solid fa-thumbs-up"></i>
  }

  // var messages;
  // if(Object.values(noteErrors).length !== 0){
    //   // messages = Object.values(noteErrors);
    //   icon = getIcon('error');
    // }else if(Object.values(sessionErrors).length !== 0){
      //   // messages = Object.values(sessionErrors);
      //   icon = getIcon('error');
      // }else if(Object.values(userErrors).length !== 0){
        //   // messages = Object.values(userErrors);
        //   icon = getIcon('error');
        // }else{
          //   messages = ['Success!'];
          //   icon = getIcon('success');
          // }
  var messages = Object.values(noteErrors).concat(Object.values(sessionErrors),Object.values(userErrors));
  var icon;
  if(messages.length === 0){
    messages = ['Success!'];
    icon = getIcon('Success');
  }else{
    icon = getIcon('error');
  }
  // debugger;
  return (
    <div id='success-modal' className='modal-off'>
      {/* {getIcon(error.key)} */}
      {/* <span>{error.value}</span> */}
      {/* {icon} */}
      {
        messages.map(message => 
          <div>
            {icon}
            <span>{message}</span>
          </div>
        )
      }
    </div>
  )
}

export default GlobalModal;