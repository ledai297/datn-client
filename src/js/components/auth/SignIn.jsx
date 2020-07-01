import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getValidateErrors } from '../../helpers/validator';
import { VALIDATE_TYPES } from '../../helpers/constants';
import { clearToken } from '../../helpers/storage';

const Link = styled.a`
  display: block;
  font-size: 12px;
  color: rgb(0, 0, 238);
`;

const Error = styled.div`
  margin-left: 25%;
  height: 15px;
  font-size: 12px;
`;

const renderError = (isHidden, messages) => {
  if (isHidden || messages.length === 0) {
    return null;
  }

  return (
    <small className="text-danger">
      {messages[0]}
    </small>     
  )
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        isFocus: false,
        error: [],
      },
      password: {
        value: '',
        isFocus: false,
        error: [],
      }
    }
    
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleFocusInput = this.handleFocusInput.bind(this);
    this.handleBlurEmail = this.handleBlurEmail.bind(this);
    this.handleBlurPassword = this.handleBlurPassword.bind(this);
    this.redirectToRegisterForm = this.redirectToRegisterForm.bind(this);
    this.redirectToResetPasswordForm = this.redirectToResetPasswordForm.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    clearToken();
  }

  setErrors() {
    const { email, password } = this.state;
    const errors = this.getErrorsInput();
    email.error = errors.emailError;
    password.error = errors.passwordError;
    
    this.setState({ email, password });
  }

  getErrorsInput() {
    const { email, password } = this.state;
    const emailError = getValidateErrors(email.value, [VALIDATE_TYPES.REQUIRED, VALIDATE_TYPES.EMAIL]);
    const passwordError = getValidateErrors(password.value, [VALIDATE_TYPES.REQUIRED, VALIDATE_TYPES.MIN]);
    return {
      emailError,
      passwordError,
    };
  }

  handleLogin() {
    const { signIn } = this.props;
    const { email, password } = this.state;
    const user = {
      email: email.value,
      password: password.value,
    }

    if (email.error.length != 0 || password.error.length != 0) {
      this.setErrors();
    } else {
      signIn(user, this.props.onSuccess, this.props.onError)
    }
  }

  handleChangeInput(e, type) {
    const currentState = { ...this.state }
    currentState[type].value = e.target.value;
    this.setState(currentState);
  }

  handleFocusInput(type) {
    const currentState = { ...this.state };
    currentState[type].error = '';
    this.setState(currentState);
  }

  handleBlurEmail() {
    const { email } = this.state;
    email.error = [...getValidateErrors(email.value, [VALIDATE_TYPES.REQUIRED, VALIDATE_TYPES.EMAIL])];
    this.setState({ email });
  }

  handleBlurPassword() {
    const { password } = this.state;
    password.error = getValidateErrors(password.value, [VALIDATE_TYPES.REQUIRED, VALIDATE_TYPES.MIN]);
    this.setState({ password });
  }

  hanldeKeyPress(e) {
    const key = e.which || e.keyCode;
    if (key === 13) {
      this.handleLogin();
    }
  }

  redirectToRegisterForm() {

  }

  redirectToResetPasswordForm() {

  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="card text-center">
        <div className="card-header">
          <div>Login</div>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group form-inline justify-content-between">
              <label htmlFor="email" className="w-25">Email</label>
              <input
                value={email.value}
                onChange={e => this.handleChangeInput(e, 'email')}
                onFocus={() => this.handleFocusInput('email')}
                onBlur={e => this.handleBlurEmail(e)}
                onKeyPress={e => this.hanldeKeyPress(e)}
                className="form-control w-75"
                name="email"
                id="email"
                placeholder="example@gmail.com"
              />
              <Error>
                {renderError(email.isFocus, email.error)}
              </Error>
            </div>
            <div className="form-group form-inline justify-content-between">
              <label htmlFor="password" className="w-25">Password</label>
              <input
                value={password.value}
                onChange={e => this.handleChangeInput(e, 'password')}
                onFocus={() => this.handleFocusInput('password')}
                onBlur={e => this.handleBlurPassword(e)}
                onKeyPress={e => this.hanldeKeyPress(e)}
                className="form-control w-75"
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <Error>
                {renderError(password.isFocus, password.error)}
              </Error>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleLogin}>
              Login
            </button>
            <Link onClick={this.redirectToRegisterForm} href="">
              Register >>
            </Link>
            <Link onClick={this.redirectToResetPasswordForm} href="">
              Forgot password >>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default SignIn;
