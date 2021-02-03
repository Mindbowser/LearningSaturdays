import React, { Component, Fragment } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import {
  passwordValidation,
  validateConfirmPassword,
  validateUserName
} from "../../utils/validations";
import ButtonItem from "../../common/component/button";
import LoginLogoComponent from "../../common/component/loginLogoComponent";
import { CHECK_CIRCLE, MESSAGE, ROUTES_PATH } from "../../constants";
import PasswordField from "../../common/component/passwordField";
import "./resetPassword.css";
import Auth from "@aws-amplify/auth";
import { toast } from "react-toastify";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      newPassword: "",
      confirmPassword: "",
      code: "",
      newPasswordError: false,
      newPasswordErrorString: "",
      confirmPasswordError: false,
      confirmPasswordErrorString: "",
      codeError: false,
      codeErrorstr: "",
      responseError: false,
      responseErrStr: "",
      showLoader: false,
      email: null,
      otp: null,
      isResetSuccess: false
    };
  }

  handleInputChange = (event, inputType) => {
    let disabled = true;
    if (inputType === "newpassword") {
      if (
        this.state.confirmPassword.length > 5 &&
        this.state.code.length &&
        event.target.value.length > 5
      ) {
        disabled = false;
      }
      this.setState({
        newPassword: event.target.value,
        newPasswordError: false,
        newPasswordErrorStr: "",
        disabled,
        responseError: false,
        responseErrStr: ""
      });
    } else if (inputType === "code") {
      if (
        this.state.confirmPassword.length > 5 &&
        this.state.newPassword.length > 5 &&
        event.target.value.length
      ) {
        disabled = false;
      }
      this.setState({
        code: event.target.value,
        codeError: false,
        codeErrorstr: "",
        disabled,
        responseError: false,
        responseErrStr: ""
      });
    } else {
      if (
        this.state.newPassword.length > 5 &&
        this.state.code.length &&
        event.target.value.length > 5
      ) {
        disabled = false;
      }
      this.setState({
        confirmPassword: event.target.value,
        confirmPasswordError: false,
        confirmErrorStr: "",
        disabled,
        responseError: false,
        responseErrStr: ""
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (!this.state.disabled) {
        this.handleResetPassword();
      }
    }
  };

  handleResetPassword = () => {
    let { newPassword, confirmPassword, code } = this.state;
    let { user } = this.props.location.state;

    if (newPassword.length > 5 && confirmPassword.length > 5 && code.length) {
      const isValidNewPassword = passwordValidation(newPassword);
      const isValidConfirmPassword = validateConfirmPassword(
        newPassword,
        confirmPassword
      );
      const isValidCode = validateUserName(code);
      if (!isValidCode) {
        this.setState({
          codeError: true,
          codeErrorstr: MESSAGE.CODE_INVALID
        });
      }
      if (!isValidNewPassword) {
        this.setState({
          newPasswordError: true,
          newPasswordErrorString: MESSAGE.PASSWORD_INVALID
        });
      }
      if (!isValidConfirmPassword && isValidNewPassword) {
        this.setState({
          confirmPasswordError: true,
          confirmPasswordErrorString: MESSAGE.CONFIRMPASSWORD_INVALID
        });
      }
      if (isValidNewPassword && isValidConfirmPassword && isValidCode) {
        this.setState({
          showLoader: true
        });

        // Collect confirmation code and new password, then
        Auth.forgotPasswordSubmit(user, code, newPassword)
          .then(data => {
            this.setState({
              isResetSuccess: true,
              showLoader: false
            });
          })
          .catch(err => {
            this.setState({
              showLoader: false
            });
            toast.error(err.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          });
      }
    }
  };

  render() {
    let {
      disabled,
      newPasswordError,
      newPasswordErrorString,
      confirmPasswordError,
      confirmPasswordErrorString,
      isResetSuccess,
      showLoader,
      responseError,
      responseErrStr,
      newPassword,
      confirmPassword,
      code,
      codeError,
      codeErrorstr
    } = this.state;

    let resetSuccess = (
      <React.Fragment>
        <FormGroup className="offset-md-4 col-md-4 offset-2 col-8 mt50">
          <div>
            <img src={CHECK_CIRCLE} alt="" />
          </div>
        </FormGroup>
        <FormGroup className="offset-md-4 col-md-4 offset-2 col-8 mt20">
          <div className="reset-password-success-text">
            {MESSAGE.RESET_PASSWORD_SUCCESS_LABEL}
          </div>
        </FormGroup>
        <FormGroup className="offset-md-4 col-md-4 offset-2 col-8 mt50 mb40">
          <ButtonItem
            {...this.props}
            className={"submit-form-button"}
            buttonValue={"BACK TO SIGN IN"}
            handleButtonAction={() =>
              this.props.history.push(ROUTES_PATH.LOGIN)
            }
            disabled={false}
          />
        </FormGroup>
      </React.Fragment>
    );

    let resetPasswordForm = (
      <Fragment>
        <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
          {responseError && (
            <div className="input-error-style">{responseErrStr}</div>
          )}
          <Label className="global-label-text">{MESSAGE.CODE}</Label>
          <Input
            className="page-input-box-style"
            autoComplete={"off"}
            placeholder={MESSAGE.CODE_PLACEHOLDER}
            onChange={e => this.handleInputChange(e, "code")}
            value={code}
            maxLength="100"
            invalid={codeError}
          />
          {codeError && <div className="input-error-style">{codeErrorstr}</div>}
        </FormGroup>
        <FormGroup className="offset-md-4 col-md-4 offset-1 col-10">
          <Label className="global-label-text">{MESSAGE.NEW_PASSWORD}</Label>
          <PasswordField
            {...this.props}
            // handleKeyPress={this.handleKeyPress}
            handlePasswordChange={e => this.handleInputChange(e, "newpassword")}
            value={newPassword}
            className={"page-input-box-style form-control"}
            maxLength={"20"}
            placeholder={MESSAGE.NEW_PASSWORD_PLACEHOLDER}
            invalid={newPasswordError}
          />
          {newPasswordError && (
            <div className="input-error-style">{newPasswordErrorString}</div>
          )}
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
        <FormGroup className="offset-md-4 col-md-4 offset-2 col-8">
          <ButtonItem
            {...this.props}
            className={"submit-form-button"}
            buttonValue={"RESET PASSWORD"}
            handleButtonAction={this.handleResetPassword}
            disabled={disabled}
            showLoader={showLoader}
          />
        </FormGroup>
      </Fragment>
    );
    return (
      <div className="login-main-div-container">
        <Row className="mrl-0 height-100vh">
          {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} className="login-logo-div">
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
                <div className="title">{MESSAGE.RESET_PASSWORD}</div>
                <div className="mb-20">
                  {isResetSuccess ? "" : MESSAGE.RESET_PASSWORD_LABEL}
                </div>
              </FormGroup>
              {isResetSuccess ? resetSuccess : resetPasswordForm}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ResetPassword;
