import React from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    };
    this.props.login(user)
    this.props.history.push('/home')
  }

  renderErrors() {
    return (
      <div className="error-modal">
        <ul className="error-list">
          {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>
              {this.state.errors[error]}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="session center-simple">
        <div id="session-form">
          <h3>Log in to Code-Mark</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-input">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <input type={'text'}
                value={this.state.usernameOrEmail}
                onChange={this.update('usernameOrEmail')}
                placeholder='username or email'
                className="text-input"
              />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input type={'password'}
                value={this.state.password}
                onChange={this.update('password')}
                placeholder='password'
                className="text-input"
              />
            </div>
            <div className='signup-buttons-wrapper'>
              <button type='submit' className={'button-session'}>Login</button>
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