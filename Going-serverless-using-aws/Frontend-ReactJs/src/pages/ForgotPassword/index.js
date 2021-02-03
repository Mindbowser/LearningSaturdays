import React, { Component, Fragment } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { validateUserName } from "../../utils/validations";
import ButtonItem from "../../common/component/button";
import LoginLogoComponent from "../../common/component/loginLogoComponent";
import { CHECK_CIRCLE, MESSAGE, ROUTES_PATH } from "../../constants";
import "../Login/login.css";
import Auth from "@aws-amplify/auth";
import { toast } from "react-toastify";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: "",
      emailError: false,
      emailErrorString: "",
      userName: "",
      userNameError: false,
      userNameErrorString: "",
      isSentrequestSuccess: false,
      showLoader: false
    };
  }

  handleInputChange = event => {
    let disabled = true;
    if (event.target.value.length >= 5) {
      disabled = false;
    }
    this.setState({
      // email: event.target.value,
      // emailError: false,
      // emailErrorString: "",
      userName: event.target.value,
      userNameError: false,
      userNameErrorString: "",
      disabled,
      showLoader: false
    });
  };

  handleForgotPassword = () => {
    let { userName } = this.state;
    if (userName.length > 3) {
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
        Auth.forgotPassword(userName)
          .then(data => {
            this.setState({
              isSentrequestSuccess: true,
              showLoader: false
            });
          })
          .catch(err => {
            this.setState({
              showLoader: false
            });
            if (err.message === "Username/client id combination not found.") {
              toast.error("Please enter valid username.", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            } else {
              toast.error(err.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            }
          });
      }
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (this.state.userName.length >= 5) {
        this.handleForgotPassword();
      }
    }
  };

  render() {
    let {
      disabled,
      userName,
      userNameError,
      userNameErrorString,
      isSentrequestSuccess,
      showLoader,
      responseErrorString,
      responseError
    } = this.state;
    let resetSuccess = (
      <React.Fragment>
        <FormGroup className="offset-md-4 col-md-4 offset-2 col-8 mt-50">
          <div>
            <img src={CHECK_CIRCLE} alt="" />
          </div>
        </FormGroup>
        <FormGroup className="offset-md-4 col-md-4 offset-2 col-8 ">
          <div className="reset-password-success-text">
            {MESSAGE.FRGOT_PASSWORD_SUCCESS_LABEL}
          </div>
        </FormGroup>
        <FormGroup className="offset-md-4 col-md-4 offset-2 col-8 mt-50 mb-40">
          <ButtonItem
            {...this.props}
            className={"submit-form-button"}
            buttonValue={"CONTINUE"}
            handleButtonAction={() =>
              this.props.history.push(ROUTES_PATH.RESET_PASSWORD, {
                user: userName
              })
            }
            disabled={false}
          />
        </FormGroup>
      </React.Fragment>
    );

    let forgotPasswordForm = (
      <Fragment>
        {/* <FormGroup className="offset-md-2 col-md-8 offset-1 col-10">
          {responseError && (
                  <div className="input-error-style">{responseErrStr}</div>
                )}
          <Label className="global-label-text">{MESSAGE.EMAIL}</Label>
          <Input
            className="page-input-box-style"
            autoComplete={"off"}
            placeholder={MESSAGE.EMAIL_PLACEHOLDER}
            onChange={(e) => this.handleInputChange(e, "email")}
            value={email}
            maxLength="100"
            invalid={emailError}
          />
          {emailError && (
            <div className="input-error-style">{emailErrorString}</div>
          )}
        </FormGroup> */}
        <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
          {responseError && (
            <div className="input-error-style">{responseErrorString}</div>
          )}
          <Label className="global-label-text">{MESSAGE.USER_NAME}</Label>
          <Input
            className="page-input-box-style"
            autoComplete={"off"}
            placeholder={MESSAGE.USER_NAME_PLACEHOLDER}
            onChange={e => this.handleInputChange(e, "userName")}
            onKeyPress={this.handleKeyPress}
            value={userName}
            maxLength="100"
            invalid={userNameError}
          />
          {userNameError && (
            <div className="input-error-style">{userNameErrorString}</div>
          )}
        </FormGroup>
        <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
          <ButtonItem
            className={"submit-form-button"}
            buttonValue={"REQUEST RESET CODE"}
            handleButtonAction={this.handleForgotPassword}
            disabled={disabled}
            showLoader={showLoader}
          />
        </FormGroup>
        <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
          <div className="sign-in-link">
            {MESSAGE.RETURN_TO_LABEL + " "}
            <span
              className="cursor-pointer link-color"
              onClick={() => this.props.history.push(ROUTES_PATH.LOGIN)}
            >
              {MESSAGE.SIGN_IN}
            </span>
          </div>
        </FormGroup>
      </Fragment>
    );
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
                <div className="title">{MESSAGE.FORGOT_PASSWORD}</div>
                <div className="mb-20">
                  {isSentrequestSuccess ? "" : MESSAGE.FORGOT_PASSWORD_LABEL}
                </div>
              </FormGroup>
              {isSentrequestSuccess ? resetSuccess : forgotPasswordForm}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ForgotPassword;
