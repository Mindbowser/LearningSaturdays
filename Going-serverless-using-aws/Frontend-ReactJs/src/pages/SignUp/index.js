import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import "../Login/login.css";
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
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import ConfirmationCodePopUp from "./confirmationCodePopUp";
import * as url from "../../utils/urls";
import axios from "../../axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: "",
      userName: "",
      userNameError: false,
      userNameErrorString: "",
      password: "",
      passwordError: false,
      passwordErrorString: "",
      confirmPassword: "",
      confirmPasswordError: false,
      confirmPasswordErrorString: "",
      lastName: "",
      lastNameError: false,
      lastNameErrorString: "",
      firstName: "",
      firstNameError: false,
      firstNameErrorString: "",
      emailError: false,
      emailErrorString: "",
      responseError: false,
      responseErrStr: "",
      showLoader: false,
      birthDate: null,
      birthDateError: false,
      birthDateErrorString: "",
      isConfirmationCodeOpen: false
    };
  }

  handleInputChange = (event, type) => {
    let disabled = true;
    console.log(type, event, this.state);
    if (type === "userName") {
      if (
        this.state.password.length > 2 &&
        this.state.email.length > 2 &&
        this.state.firstName.length > 2 &&
        this.state.lastName.length > 2 &&
        this.state.password.length > 2 &&
        this.state.confirmPassword.length > 2 &&
        this.state.birthDate !== null &&
        event.target.value.length > 2
      ) {
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
    } else if (type === "firstName") {
      if (
        this.state.password.length > 2 &&
        this.state.email.length > 2 &&
        this.state.userName.length > 2 &&
        this.state.lastName.length > 2 &&
        this.state.password.length > 2 &&
        this.state.confirmPassword.length > 2 &&
        this.state.birthDate !== null &&
        event.target.value.length > 2
      ) {
        disabled = false;
      }

      this.setState({
        firstName: event.target.value,
        firstNameError: false,
        firstNameErrorString: "",
        showLoader: false,
        disabled
      });
    } else if (type === "email") {
      if (
        this.state.password.length > 2 &&
        this.state.firstName.length > 2 &&
        this.state.userName.length > 2 &&
        this.state.lastName.length > 2 &&
        this.state.password.length > 2 &&
        this.state.confirmPassword.length > 2 &&
        this.state.birthDate !== null &&
        event.target.value.length > 2
      ) {
        disabled = false;
      }

      this.setState({
        email: event.target.value,
        emailError: false,
        emailErrorString: "",
        showLoader: false,
        disabled
      });
    } else if (type === "lastName") {
      if (
        this.state.password.length > 2 &&
        this.state.email.length > 2 &&
        this.state.userName.length > 2 &&
        this.state.firstName.length > 2 &&
        this.state.password.length > 2 &&
        this.state.confirmPassword.length > 2 &&
        this.state.birthDate !== null &&
        event.target.value.length > 2
      ) {
        disabled = false;
      }

      this.setState({
        lastName: event.target.value,
        lastNameError: false,
        lastNameErrorString: "",
        showLoader: false,
        disabled
      });
    } else if (type === "birthDate") {
      if (
        this.state.firstName.length > 2 &&
        this.state.password.length > 2 &&
        this.state.email.length > 2 &&
        this.state.userName.length > 2 &&
        this.state.lastName.length > 2 &&
        this.state.confirmPassword.length > 2 &&
        event !== null
      ) {
        disabled = false;
      }
      this.setState({
        birthDate: event,
        birthDateError: false,
        birthDateErrorString: "",
        showLoader: false,
        disabled
      });
    } else if (type === "password") {
      if (
        this.state.firstName.length > 2 &&
        this.state.email.length > 2 &&
        this.state.userName.length > 2 &&
        this.state.lastName.length > 2 &&
        this.state.confirmPassword.length > 2 &&
        this.state.birthDate !== null &&
        event.target.value.length > 2
      ) {
        disabled = false;
      }

      this.setState({
        password: event.target.value,
        passwordError: false,
        passwordErrorString: "",
        showLoader: false,
        disabled
      });
    } else if (type === "confirmpassword") {
      if (
        this.state.password.length > 2 &&
        this.state.email.length > 2 &&
        this.state.userName.length > 2 &&
        this.state.lastName.length > 2 &&
        this.state.firstName.length > 2 &&
        this.state.birthDate !== null &&
        event.target.value.length > 2
      ) {
        disabled = false;
      }

      this.setState({
        confirmPassword: event.target.value,
        confirmPasswordError: false,
        confirmPasswordErrorString: "",
        showLoader: false,
        disabled
      });
    }
  };

  handleSignIn = () => {
    let {
      userName,
      password,
      lastName,
      firstName,
      email,
      confirmPassword,
      birthDate
    } = this.state;
    this.setState({
      disabled: true
    });

    if (
      userName.length > 3 &&
      password.length > 2 &&
      lastName.length > 2 &&
      firstName.length > 2 &&
      email.length > 2 &&
      confirmPassword.length > 2 &&
      birthDate !== null
    ) {
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
        Auth.signUp({
          username: userName,
          password,
          attributes: {
            email,
            family_name: lastName,
            given_name: firstName
          }
        })
          .then(user => {
            console.log(user);
            this.setState({
              showLoader: false
            });
            toast.info(
              "Please check your email to get confirmation code which is used to confirm user.",
              {
                position: toast.POSITION.BOTTOM_RIGHT
              }
            );
            this.handleonfirmationCodeToggle();
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
  handleonfirmationCodeToggle = () => {
    this.setState(state => ({
      isConfirmationCodeOpen: !state.isConfirmationCodeOpen
    }));
  };
  toggleSignupLoader = val => {
    this.setState({
      showLoader: val
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
      responseErrStr,
      email,
      emailError,
      emailErrorString,
      passwordError,
      passwordErrorString,
      confirmPassword,
      confirmPasswordError,
      confirmPasswordErrorString,
      lastName,
      lastNameError,
      lastNameErrorString,
      firstName,
      firstNameError,
      firstNameErrorString,
      birthDate,
      birthDateError,
      birthDateErrorString,
      isConfirmationCodeOpen
    } = this.state;

    return (
      <div className="login-main-div-container">
        <ConfirmationCodePopUp
          {...this.props}
          heading={`CONFIRMATION CODE`}
          buttonValue={`SUBMIT`}
          isOpen={isConfirmationCodeOpen}
          toggle={this.handleonfirmationCodeToggle}
          className={`add-provider-modal`}
          type={`Sign-Up`}
          email={email}
          password={password}
          userName={userName}
          dob={birthDate}
          lastName={lastName}
          firstName={firstName}
          toggleSignupLoader={this.toggleSignupLoader}
        />
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
            <div className="row" style={{ marginTop: "20px", width: "100%" }}>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                <div className="title">{`Sign Up`}</div>
                {/* <div className="mb-20">{MESSAGE.SIGN_IN_LABEL}</div> */}
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
                <Label className="global-label-text">Last Name</Label>
                <Input
                  className="page-input-box-style"
                  autoComplete={"false"}
                  placeholder={`Last Name`}
                  onChange={e => this.handleInputChange(e, "lastName")}
                  value={lastName}
                  maxLength="100"
                  invalid={lastNameError}
                />
                {lastNameError && (
                  <div className="input-error-style">{lastNameErrorString}</div>
                )}
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                <Label className="global-label-text">First Name</Label>
                <Input
                  className="page-input-box-style"
                  autoComplete={"false"}
                  placeholder={`First Name`}
                  onChange={e => this.handleInputChange(e, "firstName")}
                  value={firstName}
                  maxLength="100"
                  invalid={firstNameError}
                />
                {firstNameError && (
                  <div className="input-error-style">
                    {firstNameErrorString}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                <Label className="global-label-text">{MESSAGE.EMAIL}</Label>
                <Input
                  className="page-input-box-style"
                  autoComplete={"off"}
                  placeholder={MESSAGE.EMAIL}
                  onChange={e => this.handleInputChange(e, "email")}
                  maxLength="100"
                  invalid={emailError}
                />
                {emailError && (
                  <div className="input-error-style">{emailErrorString}</div>
                )}
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                <Label className="global-label-text">
                  {MESSAGE.BIRTH_DATE}
                </Label>
                <DatePicker
                  value={
                    birthDate !== null
                      ? moment(birthDate).format("DD/MM/YYYY")
                      : null
                  }
                  // selected={birthDate}
                  onChange={e => this.handleInputChange(e, "birthDate")}
                  className="page-input-box-style date-picker-css"
                  maxDate={new Date()}
                  placeholderText="Date Of Birth"
                  autoComplete={"off"}
                  onChangeRaw={e => e.preventDefault()}
                  showMonthDropdown
                  showYearDropdown
                  scrollableYearDropdown
                />
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
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
                <Label className="global-label-text">
                  {MESSAGE.CONFIRM_PASSWORD}
                </Label>
                <PasswordField
                  {...this.props}
                  handleKeyPress={e => this.handleKeyPress(e)}
                  handlePasswordChange={e =>
                    this.handleInputChange(e, "confirmpassword")
                  }
                  value={confirmPassword}
                  className={"page-input-box-style form-control"}
                  maxLength={"20"}
                  placeholder={MESSAGE.CONFIRM_PASSWORD_PLACEHOLDER}
                  invalid={confirmPasswordError}
                />
                {confirmPasswordError && (
                  <div className="input-error-style">
                    {confirmPasswordErrorString}
                  </div>
                )}
              </FormGroup>
              {/* <FormGroup className="offset-lg-3 col-lg-4 offset-md-5 col-md-5 offset-4 col-7">
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
              </FormGroup> */}
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10 mt40 mb40">
                <ButtonItem
                  // {...this.props}
                  className={"submit-form-button"}
                  buttonValue={"SIGN UP"}
                  handleButtonAction={this.handleSignIn}
                  disabled={disabled}
                  showLoader={showLoader}
                />
              </FormGroup>
              <FormGroup className="offset-md-4 col-md-4 offset-1 col-10 mt40 mb40">
                <div className="sign-in-link">
                  Existing user?
                  <span
                    className="cursor-pointer"
                    onClick={() => this.props.history.push(ROUTES_PATH.LOGIN)}
                  >
                    Sign In
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
