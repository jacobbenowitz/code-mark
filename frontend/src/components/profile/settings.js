import React from 'react'
import Avatar from './avatar';
import AvatarForm from './avatar_form';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      color: '',
      updated: false,
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    // this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
  }

  componentDidUpdate() {
    const { email, username, color } = this.props.user;
    if (Object.values(this.props.user).length &&
      (!this.state.email.length || !this.state.username.length ||
        this.props.errors !== this.state.errors)) {

      this.setState({
        email: email,
        username: username,
        color: color,
        errors: this.props.errors
      })
    }
  }

  confirmedDelete() {
    this.props.removeUser(this.props.currentUser.id);
    this.props.logout();
    this.props.toggleModal();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
      updated: true
    });
  };

  // toggleSuccessModal() {
  //   const successModal = document.getElementById('success-modal');
  //   successModal.className = "success-in modal-on"
  //   setTimeout(() => successModal.className = "success-out", 4000)
  //   setTimeout(() => successModal.className = "modal-off", 5000)
  // }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    // debugger;
    this.state.password2.length ? (
      user = {
        id: this.props.currentUser.id,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
        color: this.state.color
      }
    ) : (
      user = {
        id: this.props.currentUser.id,
        email: this.state.email,
        username: this.state.username,
        password: this.props.user.password,
        password2: this.props.user.password,
        color: this.state.color
      }
    )
    this.props.updateUser(user);
    this.props.toggleModal();
    this.setState({ updated: false })
    // this.toggleSuccessModal()

    // this.props.showModal(sucess: 'some message')
    // this.props.showModal(error: 'some message')

    this.props.fetchCurrentUser()
    window.scrollTo(0, 0);
  }

  renderErrors(field) {
    return (
      <span className="error-item" key={`error-${field}`}>
        {this.state.errors[field]}
      </span>
    )
  };

  toggleDeleteModal() {
    const deleteModal = document.getElementById('confirm-modal-container');
    if (deleteModal.className === "modal-off") {
      deleteModal.className = "modal-on";
    } else {
      deleteModal.className = "modal-off";
    }
  }

  checkAllFields() {

    if (this.state.username !== this.props.user.username ||
      this.state.email !== this.props.user.email ||
      this.state.color !== this.props.user.color ||
      (this.state.password === this.state.password2 &&
        this.state.password2 !== '')
    ) { return true } else return false
  }

  render() {
    return (

      <div className='session center-simple'>
        {/* <div id='success-modal' className='modal-off'>
          <i className="fa-solid fa-thumbs-up"></i>
          <span>Account Successfully updated</span>
        </div> */}
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

          <form onSubmit={this.checkAllFields() ?
            this.handleSubmit : undefined}>

            <div className='color-change-view'>
              <div className="color-select-wrapper">
                <i className="fa-solid fa-eye-dropper fa-xs"
                  style={{ color: this.state.color }}
                />
                <input
                  type={'color'}
                  value={this.state.color}
                  id="color-change"
                  onChange={this.update('color')}
                />
              </div>
              <AvatarForm
                username={this.state.username}
                color={this.state.color}
              />
            </div>

            <div className='form-input'>
              <label htmlFor='email'>Email</label>
              <input type={'email'}
                id="email-signup"
                value={this.state.email}
                onChange={this.update('email')}
                // placeholder='email'
                className="text-input"
              />
              {this.renderErrors('email')}
            </div>
            <div className='form-input'>
              <label htmlFor='username'>Username</label>
              <input type={'text'}
                value={this.state.username}
                id="username-signup"
                onChange={this.update('username')}
                // placeholder='username'
                className="text-input"
              />
              {this.renderErrors('username')}
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
              {this.renderErrors('password')}
            </div>
            <div className="form-input">
              <label htmlFor="password2">Confirm New Password</label>
              <input type={'password'}
                // value={this.state.password2}
                id="password-signup2"
                onChange={this.update('password2')}
                placeholder='confirm password'
                className="text-input"
              />

              {this.renderErrors('password2')}
            </div>
            <div className='signup-buttons-wrapper'>
              <button type='submit'
                className={this.checkAllFields() ? 'button-session' : 'button-session disabled'}>Update account</button>
            </div>

            <div className='session-error-wrapper'>
              <div className='session-error'>

                {this.checkAllFields() ?
                  <i className="fa-solid fa-circle-check"></i>
                  :
                  <i className="fa-solid fa-circle-xmark"></i>
                }
                <span>At least one field must be updated</span>
              </div>

              {this.state.password.length ? (
                <div className='session-error'>
                  {(this.state.password.length < 6 || this.state.password2.length < 6) ?
                    <i className="fa-solid fa-circle-xmark"></i>
                    :
                    <i className="fa-solid fa-circle-check"></i>
                  }
                  <span>Passwords must be 6 characters or more</span>
                </div>
              ) : ""}
              {this.state.password.length ? (
                <div className='session-error'>
                  {(this.state.password !== this.state.password2 || this.state.password === '') ?
                    <i className="fa-solid fa-circle-xmark"></i>
                    :
                    <i className="fa-solid fa-circle-check"></i>
                  }
                  <span>Passwords Must Match</span>

                </div>
              ) : ""}
            </div>

          </form>
        </div>
      </div>
    )
  }
}
