import React from 'react';
import { withRouter } from 'react-router-dom';

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
      <ul>
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
                onChange={this.update('username')}
                placeholder='username'
                className="text-input"
              />
            </div>
            <div className='form-input'>
              <label htmlFor='password'>Password</label>
              <input type={'password'}
                value={this.state.password}
                onChange={this.update('password')}
                placeholder='password'
                className="text-input"
              />
            </div>
            <div className="form-input">
              <label htmlFor="password2">Confirm Password</label>
              <input type={'password'}
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder='confirm password'
                className="text-input"
              />
            </div>
            <button type='submit'
              className={'button-session'}>Signup</button>
            {this.renderErrors()}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignupForm);