import React from 'react'


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      updated: false,
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
  }

  componentDidUpdate() {
    const { email, username } = this.props.user;
    if (!this.state.email.length) {
      this.setState({
        email: email,
        username: username,
      })
    }
  }

  confirmedDelete() {
    this.props.removeUser(this.props.currentUser.id);
    this.props.logout();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
      updated: true
    });
  };

  toggleSuccessModal(){
    const successModal = document.getElementById('success-modal');
    successModal.className = "success-in modal-on" 
    setTimeout(() => successModal.className = "success-out", 4000)
    setTimeout(() => successModal.className = "modal-off", 5000)
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    this.state.password2.length ? (
      user = {
        id: this.props.currentUser.id,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
      }
    ) : (
      user = {
        id: this.props.currentUser.id,
        email: this.state.email,
        username: this.state.username,
        password: this.props.user.password,
        password2: this.props.user.password,
      }
    )
    this.props.updateUser(user);
    this.setState({ updated: false })
    this.toggleSuccessModal()
  }

  renderErrors() {
    return (
      <ul className="error-list">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  toggleDeleteModal() {
    const deleteModal = document.getElementById('confirm-modal-container');
    if (deleteModal.className === "modal-off") {
      deleteModal.className = "modal-on";
    } else {
      deleteModal.className = "modal-off";
    }
  }

  checkAllFields() {
    if (this.state.password.length && this.state.password2.length) {
      return true
    }
    else return false
  }

  render() {
    return (
  
      <div className='session center-simple'>
        <div id='success-modal' className='modal-off'>
          <i className="fa-solid fa-thumbs-up"></i>
          <span>Account Successfully updated</span>
        </div>
        <div id='confirm-modal-container' className='modal-off' >
          <div className='modal-wrapper'>
            <div className='cancel-modal'>
              <h5>Are you sure you want to delete your account?</h5>
              <span>All of your notes and comments will be permanently removed.</span>
              <div className='modal-buttons'>
                <div className='delete-note icon-button'
                  onClick={() => this.confirmedDelete()}>
                  <i className="fa-solid fa-trash fa-lg"></i>
                  <span>
                    Delete
                  </span>
                </div>
                <div className='cancel icon-button'
                  onClick={() => this.toggleDeleteModal()}>
                  <i className="fa-solid fa-ban fa-lg"></i>
                  <span>
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id='session-form'>
          <div className='icon-buttons-wrapper'>
            <div className='icon-button' onClick={() =>
              this.props.history.goBack()}>
              <i className="fa-solid fa-arrow-left"></i>
              <span>Go back</span>
            </div>
            <div className='icon-button' onClick={this.toggleDeleteModal}>
              <i className="fa-solid fa-trash fa-lg"></i>
              <span>Delete account</span>
            </div>
          </div>
          <h3>Update your account</h3>
          <form onSubmit={this.handleSubmit}>
            <div className='form-input'>
              <label htmlFor='email'>Email</label>
              <input type={'email'}
                id="email-signup"
                value={this.state.email}
                onChange={this.update('email')}
                // placeholder='email'
                className="text-input"
              />
            </div>
            <div className='form-input'>
              <label htmlFor='username'>username</label>
              <input type={'text'}
                value={this.state.username}
                id="username-signup"
                onChange={this.update('username')}
                // placeholder='username'
                className="text-input"
              />
            </div>
            <div className='form-input'>
              <label htmlFor='password'>New Password</label>
              <input type={'password'}
                value={this.state.password}
                id="password-signup"
                onChange={this.update('password')}
                placeholder='password'
                className="text-input"
              />
            </div>
            <div className="form-input">
              <label htmlFor="password2">Confirm New Password</label>
              <input type={'password'}
                value={this.state.password2}
                id="password-signup2"
                onChange={this.update('password2')}
                placeholder='confirm password'
                className="text-input"
              />
            </div>
            <div className='signup-buttons-wrapper'>
              <button type='submit' 
                className={(this.state.password.length > 6 && this.state.password2.length > 6) ? 'button-session' : 'button-session disabled'}>Update account</button>
            </div>

            <div className='session-error-wrapper'>
              <div className='session-error'>
                {(this.state.password.length < 6 || this.state.password2.length < 6) ? 
                <i className="fa-solid fa-circle-xmark"></i>
                :
                <i className="fa-solid fa-circle-check"></i> 
                }
                <span>Passwords must be 6 characters or more</span>
              </div>

              <div className='session-error'> 
                {(this.state.password !== this.state.password2 || this.state.password === '') ?
                  <i className="fa-solid fa-circle-xmark"></i>
                  :
                  <i className="fa-solid fa-circle-check"></i>
                }
                <span>Passwords Must Match</span>
               
              </div>
            </div>
            
    
          
            {this.renderErrors()}
          </form>
        </div>
      </div>
    )
  }
}
