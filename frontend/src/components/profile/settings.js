import React from 'react'

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
  }

  componentDidUpdate() {
    const { email, username } = this.props.user;
    this.state.email.length ? (
      undefined
    ) : (
      this.setState({
        email: email,
        username: username,
      })
    )
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    let user;
    this.state.password2.length ? (
      user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
      }
    ) : (
      user = {
        email: this.state.email,
        username: this.state.username,
        password: this.props.user.password,
        password2: this.props.user.password,
      }
    )
    this.props.updateUser(user);
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

  render() {
    return (
      <div className='session center-simple'>
        <div id='confirm-modal-container' className='modal-off' >
          <div className='modal-wrapper'>
            <div className='cancel-modal'>
              <h5>Are you sure you want to delete your account?</h5>
              <span>All of your notes and comments will be permanently removed.</span>
              <div className='modal-buttons'>
                <div className='delete-note icon-button'
                  onClick={() => this.props.deleteUser(this.props.currentUser.id)}>
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
              <i class="fa-solid fa-arrow-left"></i>
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
                className={'button-session'}>Update account</button>
            </div>
            {this.renderErrors()}
          </form>
        </div>
      </div>
    )
  }
}
