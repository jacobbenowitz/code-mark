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
    successModal.className = "global-modal-in-out"
    // setTimeout(() => successModal.className = "success-out", 4000)
    setTimeout(() => {
      successModal.className = "modal-off";
    }, 5000)
  }

  getIcon(errorType,message) {
    if (errorType === 'error') 
    { return <i className="fa-solid fa-xmark modal"></i>}
      
    else if (message[0] === 'Hello') 
    { return '👋'}
      
    else 
    { return <i className="fa-solid fa-thumbs-up"></i>}
   
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
    var newmessages = [];
    if (noteErrors.length === undefined){
      var content = (noteErrors.response === undefined) ? noteErrors : noteErrors.response.data;
      if(typeof content === 'object'){
        Object.values(content).map(error => {
          newmessages.push(['error',error]);
        })
      }else if(typeof content === 'string'){
        newmessages.push(['error',noteErrors.response.statusText]);
      }
    }else if(sessionErrors.length === undefined){
      var content = (sessionErrors.response === undefined) ? sessionErrors : sessionErrors.response.data;
      if(typeof content === 'object'){
        Object.values(content).map(error => {
          newmessages.push(['error',error]);
        })
      }else if(typeof content === 'string'){
        newmessages.push(['error',sessionErrors.response.statusText]);
      }
    }else if(userErrors.length === undefined){
      var content = (userErrors.response === undefined) ? userErrors : userErrors.response.data;
      if(typeof content === 'object'){
        Object.values(content).map(error => {
          newmessages.push(['error',error]);
        })
      }else if(typeof content === 'string'){
        newmessages.push(['error',userErrors.response.statusText]);
      }
    }
    else if(commentErrors.length === undefined){
      var content = (commentErrors.response === undefined) ? commentErrors : commentErrors.response.data;
      if(typeof content === 'object'){
        Object.values(content).map(error => {
          newmessages.push(['error',error]);
        })
      }else if(typeof content === 'string'){
        newmessages.push(['error',commentErrors.response.statusText]);
      }
    }else{
      newmessages = [noteErrors,sessionErrors,userErrors,commentErrors].filter(ele => ele.length > 0);
    }
    if (newmessages.length !== 0) {
      this.setState({
        messages: newmessages,
        modalOn: true
      },() => {
        this.state.messages.length > 0 ? this.toggleSuccessModal(): '';
      })
    }
  }
  // if(messages.length === 0){
  //   messages = ['Success!'];
  //   icon = getIcon('Success');
  // }else{
  //   icon = getIcon('error');
  // }

  render(){
    return (
      <div className='global-modal-wrapper'>
        <div id='success-modal' className='modal-off'>
        
        {
          this.state.messages?.map((message,idx) => {
            // console.log(`message ${idx}: ${message}`)
            return ( 
              <div className='modal-message'
                key={`error-message-${idx}`}>
                {this.getIcon(message[0],message[1].split(' '))}
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