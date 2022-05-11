import React from 'react';
import { withRouter } from 'react-router-dom';
import Demo from "./demo_user_signup"

class SignupForm extends React.Component {
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
    this.demoSignup = this.demoSignup.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/home') // redirect if not authenticated
    }
    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  };

  demoScript(e) {
    e.preventDefault();
     
    Demo.demoSignupForm();
  }

  demoSignup = (e) => {
     
    e.preventDefault();
    const user = {
      email: 'Guest@gmail.com',
      username: 'Guest',
      password: 'password',
      password2: 'password'
    }
     debugger
    this.props.loginGuest(user);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.signup(user, this.props.history);
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
          <h3>Create a new account</h3>
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
            <button type='submit'
              className={'button-session'}>Signup</button>
            {this.renderErrors()}
          </form>

          <button className="demo_button"
            id="demo-signup"
            onClick={this.demoScript}
          >Demo account</button>

          <button 
            onClick={this.demoSignup}
            id="hidden-demo">Demo only
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(SignupForm);