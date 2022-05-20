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
    const { email, username, password } = this.props.user;
    this.props.fetchUser(this.props.currentUser.id)
    this.setState({
      email: email,
      username: username,
    })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    // this.props.updateUser(user, this.props.history);
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

  render() {
    return (
      <div className='session center-simple'>
        <div id='session-form'>
          <h3>Update your account</h3>
          <form onSubmit={this.handleSubmit}>
            <div className='form-input'>
              <label htmlFor='email'>Email</label>
              <input type={'email'}
                id="email-signup"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder='email'
                className="text-input"
              />
            </div>
            <div className='form-input'>
              <label htmlFor='username'>username</label>
              <input type={'text'}
                value={this.state.username}
                id="username-signup"
                onChange={this.update('username')}
                placeholder='username'
                className="text-input"
              />
            </div>
            <div className='form-input'>
              <label htmlFor='password'>Password</label>
              <input type={'password'}
                value={this.state.password}
                id="password-signup"
                onChange={this.update('password')}
                placeholder='password'
                className="text-input"
              />
            </div>
            <div className="form-input">
              <label htmlFor="password2">Confirm Password</label>
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
