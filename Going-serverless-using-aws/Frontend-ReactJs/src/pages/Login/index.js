import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import "./login.css";
import { ROUTES_PATH, MESSAGE } from "../../constants";
import PasswordField from "../../common/component/passwordField";
import LoginLogoComponent from "../../common/component/loginLogoComponent";
import ButtonItem from "../../common/component/button";
import { saveToken } from "../../utils/localStorage";
import Auth from "@aws-amplify/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../modules/actions";
import { validateUserName } from "../../utils/validations";
import { toast } from "react-toastify";
import * as url from "../../utils/urls";
import axios from "../../axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: "",
      userName: "",
      userNameError: false,
      userNameErrorString: "",
      password: "",
      emailError: false,
      emailErrorString: "",
      responseError: false,
      responseErrStr: "",
      showLoader: false
    };
  }

  handleInputChange = (event, inputName) => {
    let disabled = true;

    if (inputName === "userName") {
      if (this.state.password.length > 2 && event.target.value.length > 2) {
        disabled = false;
      }
      this.setState({
        userName: event.target.value,
        userNameError: false,
        userNameErrorString: "",
        responseError: false,
        responseErrStr: "",
        disabled
      });
    } else {
      if (this.state.userName.length > 2 && event.target.value.length > 2) {
        disabled = false;
      }
      this.setState({
        password: event.target.value,
        responseError: false,
        responseErrStr: "",
        disabled
      });
    }
  };

  handleSignIn = () => {
    let { userName, password } = this.state;
    this.setState({
      disabled: true
    });

    if (userName.length > 3 && password.length > 2) {
      const isValidatedUserName = validateUserName(userName);

      if (!isValidatedUserName) {
        this.setState({
          userNameError: true,
          userNameErrorString: MESSAGE.USER_NAME_INVALID
        });
      }

      if (isValidatedUserName) {
        this.setState({
          showLoader: true
        });
        Auth.signIn(userName, password)
          .then(user => {
            if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
              this.props.saveUser(user);
              this.props.history.push(ROUTES_PATH.NEW_PASSWORD);
            } else {
              saveToken(
                user.signInUserSession.accessToken.jwtToken,
                user.signInUserSession.refreshToken.token,
                user.signInUserSession.idToken.jwtToken
              );
              this.props.loginSuccess({
                userName: user.username,
                attributes: user.attributes,
                accessToken: user.signInUserSession.accessToken,
                idToken: user.signInUserSession.idToken,
                refreshToken: user.signInUserSession.refreshToken
              });

              this.props.history.push(ROUTES_PATH.HOME);
            }
          })
          .catch(e => {
            console.log(e);
            this.setState({
              showLoader: false
            });
            if (e.message === "User does not exist.") {
              toast.error("Incorrect username or password.", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            } else {
              toast.error(e.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            }
          });
      }
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (!this.state.disabled) {
        this.handleSignIn();
      }
    }
  };

  handleSignUpApi = () => {
    axios
      .post(url.signUpUrl)
      .then(response => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          if (response.data.statusCode === 200) {
            console.log(response.data);
            // this.props.toggleSignupLoader(false);
            // if (getAuthType() === "sign-up") {
            //   this.props.history.push(ROUTES_PATH.HOME);
            // }
          }
        }
      })
      .catch(error => {
        // this.props.toggleSignupLoader(false);
        console.log(error);
        if (error.message === "Request failed with status code 302") {
          console.log(error);
        } else {
          toast.error("500 Internal server error", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      });
  };
  render() {
    let {
      userName,
      userNameError,
      userNameErrorString,
      password,
      disabled,
      showLoader,
      responseError,
      responseErrStr
    } = this.state;

    return (
      <div className="login-main-div-container">
        <Row className="mrl-0 height-100vh">
          {/* <Col xs={12} sm={12} md={6} lg={5} xl={5} className="login-logo-div">
            <LoginLogoComponent className="logo-heading" />
          </Col> */}
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="login-form-div"
          >
            <div className="row div-width">
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                <div className="title">{MESSAGE.SIGN_IN}</div>
                <div className="mb-20">{MESSAGE.SIGN_IN_LABEL}</div>
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                {responseError && (
                  <div className="input-error-style">{responseErrStr}</div>
                )}
                <Label className="global-label-text">{MESSAGE.USER_NAME}</Label>
                <Input
                  className="page-input-box-style"
                  autoComplete={"false"}
                  placeholder={MESSAGE.USER_NAME_PLACEHOLDER}
                  onChange={e => this.handleInputChange(e, "userName")}
                  value={userName}
                  maxLength="100"
                  invalid={userNameError}
                />
                {userNameError && (
                  <div className="input-error-style">{userNameErrorString}</div>
                )}
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                <Label className="global-label-text">{MESSAGE.PASSWORD}</Label>
                <PasswordField
                  {...this.props}
                  handleKeyPress={this.handleKeyPress}
                  handlePasswordChange={e =>
                    this.handleInputChange(e, "password")
                  }
                  value={password}
                  className={"page-input-box-style form-control"}
                  maxLength={"20"}
                  placeholder={MESSAGE.PASSWORD_PLACEHOLDER}
                  invalid={false}
                />
              </FormGroup>
              <FormGroup className="offset-lg-4 col-lg-4 offset-md-5 col-md-5 offset-4 col-7">
                <div className="forgot-password-link">
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      this.props.history.push(ROUTES_PATH.FORGOT_PASSWORD)
                    }
                  >
                    {MESSAGE.FORGOT_PASSWORD}
                  </span>
                </div>
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10 mt40 mb40">
                <ButtonItem
                  // {...this.props}
                  className={"submit-form-button"}
                  buttonValue={"SIGN IN"}
                  handleButtonAction={this.handleSignIn}
                  disabled={disabled}
                  showLoader={showLoader}
                />
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10 mt40 mb40">
                <div className="sign-in-link">
                  New user?
                  <span
                    className="cursor-pointer"
                    onClick={() => this.props.history.push(ROUTES_PATH.SIGNUP)}
                  >
                    Sign Up
                  </span>
                </div>
              </FormGroup>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.profile,
    userDetails: state.userDetails.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginSuccess: ActionCreators.loginSuccess,
      saveUser: ActionCreators.saveUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
