import React from 'react';
import { withRouter } from 'react-router-dom';
import Demo from "./demo_user_signup"
import { Link } from 'react-router-dom';

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
    const guest = {
      usernameOrEmail: 'Guest',
      password: 'password'
    }
    this.props.loginGuest(guest);
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

  renderErrors(field) {
    return (
          <span className="error-item" key={`error-${field}`}>
            {this.state.errors[field]}
          </span>
        )
  };

  checkAllFields() {
    if (this.state.username.length && this.state.password.length && this.state.password2.length && this.state.email.length) {
      return true 
    }
    else return false
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
              {this.renderErrors('email')}
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
              {this.renderErrors('username')}
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
              {this.renderErrors('password')}
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
              {this.renderErrors('password2')}
            </div>
            <div className='signup-buttons-wrapper'>
              <button type='submit'
                className={this.checkAllFields() ? 'button-session' : 'button-session disabled'}>Signup</button>
              <button className="demo_button"
                id="demo-signup"
                onClick={this.demoScript}
              >Demo account</button>
              <button
                onClick={this.demoSignup}
                id="hidden-demo">Demo only
              </button>
            </div>
          </form>

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


          <span className="alt-session-link">
            <p>Already have an account?</p>
            <Link to={'/login'}>Login</Link>
          </span>
        </div>
      </div>
    )
  }
}

export default withRouter(SignupForm);