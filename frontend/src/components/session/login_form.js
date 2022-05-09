import React from 'react'
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(user);
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
              <label htmlFor="username">Username</label>
                <input type={'text'}
                  value={this.state.username}
                  onChange={this.update('username')}
                  placeholder='username'
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
            <button type='submit'className={'button-session'}>Login</button>
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