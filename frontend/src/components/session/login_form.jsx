import React from 'react'
import {withRouter} from 'react-router-dom';

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
    this.setState({errors: nextProps.errors})
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type={'text'}
              value={this.state.username}
              onChange={this.update('username')}
              placeholder='username'
            />
            <br />
            <input type={'password'}
              value={this.state.password}
              onChange={this.update('password')}
              placeholder='password'
            />
            <br />
            <button type='submit' value={'Login'}
              className={'button-session'}
            />
            { this.renderErrors() }
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginForm)