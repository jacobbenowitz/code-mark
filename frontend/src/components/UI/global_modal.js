import React from 'react';

class GlobalModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      modalOn: false
    };
    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    this.getIcon = this.getIcon.bind(this);
  }

  toggleSuccessModal() {
    const successModal = document.getElementById('success-modal');
    successModal.className = "success-in modal-on"
    setTimeout(() => successModal.className = "success-out", 4000)
    setTimeout(() => {
      successModal.className = "modal-off";
      // this.setState({})
    }, 5000)
  }

  getIcon(errorType) {
    return errorType === 'error' ?
      <i className="fa-solid fa-xmark modal"></i>
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
  // var messages = Object.values(noteErrors).concat(Object.values(sessionErrors),Object.values(userErrors));
  // componentDidUpdate(){
  //   if(){this.toggleSuccessModal();}
  // }

  componentWillReceiveProps(nextProps) {
    let {noteErrors,sessionErrors,userErrors,commentErrors} = nextProps;
    // debugger
    var newmessages = [];
    if (noteErrors.length === undefined){
      Object.values(noteErrors).map(error => {
        newmessages.push(['error',error]);
      })
    }else if(sessionErrors.length === undefined){
      Object.values(sessionErrors).map(error => {
        newmessages.push(['error',error]);
      })
    }else if(userErrors.length === undefined){
      Object.values(userErrors).map(error => {
        newmessages.push(['error',error]);
      })
    }
    else if(commentErrors.length === undefined){
      Object.values(commentErrors).map(error => {
        newmessages.push(['error',error]);
      })
    }else{
      newmessages = [noteErrors,sessionErrors,userErrors,commentErrors].filter(ele => ele.length > 0);
    }
    // debugger;
    this.setState({
      messages: newmessages,
      modalOn: true
    },() => {
      this.state.messages.length > 0 ? this.toggleSuccessModal(): '';
    })
  }
  // if(messages.length === 0){
  //   messages = ['Success!'];
  //   icon = getIcon('Success');
  // }else{
  //   icon = getIcon('error');
  // }
  // debugger;
  render(){
    // this.toggleSuccessModal();
    return (
      <div className='global-modal-wrapper'>
        <div id='success-modal' className='modal-off'>
        {/* {getIcon(error.key)} */}
        {/* <span>{error.value}</span> */}
        {/* {icon} */}
        {
          this.state.messages.map((message,idx) => {
            return ( 
              <div className='modal-message'
                key={`error-message-${idx}`}>
                {this.getIcon(message[0])}
                <span>{message[1]}</span>
              </div>
            )
            // console.log(message);
          })
        }
        </div>
      </div>
      )
    }
}

export default GlobalModal;