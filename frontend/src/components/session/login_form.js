import React from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Demo from "./demo_user_login"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentuser === true) {
      this.props.history.push('/home') // redirect if authenticated
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
    let user = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    };
    this.props.login(user)
    this.props.history.push('/home')
  }

  renderErrors(field) {
    return (
      <span className="error-item" key={`error-${field}`}>
        {this.state.errors[field]}
      </span>
    )
  };

  checkAllFields() {
    if (this.state.usernameOrEmail.length && this.state.password.length) {
      return true
    }
    else return false
  }

  render() {

    return (
      <div className="session center-simple">
        <div id="session-form">
          <h3>Log in to Code-Mark</h3>
          <form onSubmit={this.checkAllFields ? this.handleSubmit : undefined}>
            <div className="form-input">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <input type={'text'}
                id='usernameOrEmail'
                value={this.state.usernameOrEmail}
                onChange={this.update('usernameOrEmail')}
                placeholder='username or email'
                className={(this.state.errors.username || this.state.errors.email) ? "text-input error" : "text-input"}
  
              />
              {this.renderErrors('username')}
              {this.renderErrors('email')}
              {/* {this.renderErrors('usernameOrEmail')} */}
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input type={'password'}
                id='password'
                value={this.state.password}
                onChange={this.update('password')}
                placeholder='password'
                className={this.state.errors.password ? "text-input error" : "text-input"}
              />
              {this.renderErrors('password')}
            </div>
            <div className='signup-buttons-wrapper'>
              <button type='submit' className={this.checkAllFields() ? 'button-session' : 'button-session disabled'}>Login</button>

              <button className="demo_button"
                id="demo-signup"
                onClick={this.demoScript}
              >Demo account</button>
              <button
                onClick={this.demoSignup}
                id="hidden-demo">Demo only
              </button>
            </div>
            {this.renderErrors()}
            <span className="alt-session-link">
              <p>Don't have an account?</p>
              <Link to={'/signup'}>Sign up</Link>
            </span>
          </form>
        </div >
      </div>
    )
  }
}

export default withRouter(LoginForm)