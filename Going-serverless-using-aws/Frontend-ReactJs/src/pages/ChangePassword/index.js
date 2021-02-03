import React from "react";
import { Row, Col, Label } from "reactstrap";
import { CHEVRON_RIGHT_ICON, MESSAGE, ROUTES_PATH } from "../../constants";
import ButtonItem from "../../common/component/button";
import PasswordField from "../../common/component/passwordField";
import {
  passwordValidation,
  validateConfirmPassword
} from "../../utils/validations";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      disabled: true,
      oldPassword: "",
      newPassword: "",
      oldPasswordError: false,
      OldErrorString: "",
      responseErrStr: "",
      error: false,
      newPasswordError: false,
      newPasswordErrorStr: "",
      confirmPassword: "",
      confirmPasswordError: false,
      confirmPasswordErrorString: ""
    };
  }

  handleInputChange = (event, inputName) => {
    let disabled = true;
    if (inputName === "oldpassword") {
      if (
        this.state.newPassword.length > 3 &&
        this.state.confirmPassword.length > 3 &&
        event.target.value.length > 3
      ) {
        disabled = false;
      }
      this.setState({
        oldPassword: event.target.value,
        oldPasswordError: false,
        OldErrorString: "",
        responseErrStr: "",
        error: false,
        disabled
      });
    } else if (inputName === "confirmpassword") {
      if (
        this.state.newPassword.length > 3 &&
        this.state.oldPassword.length > 3 &&
        event.target.value.length > 3
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
    } else {
      if (
        this.state.oldPassword.length > 3 &&
        this.state.confirmPassword.length > 3 &&
        event.target.value.length > 3
      ) {
        disabled = false;
      }
      this.setState({
        newPassword: event.target.value,
        disabled,
        responseErrStr: "",
        error: false,
        newPasswordError: false,
        newPasswordErrorStr: ""
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (!this.state.disabled) {
        this.handleChangePassword();
      }
    }
  };

  handleChangePassword = () => {
    let { oldPassword, newPassword, confirmPassword } = this.state;
    if (oldPassword.length > 3 && newPassword.length > 3) {
      const isValidNewPassword = passwordValidation(newPassword);
      const isValidConfirmPassword = validateConfirmPassword(
        newPassword,
        confirmPassword
      );
      if (!isValidNewPassword) {
        this.setState({
          newPasswordError: true,
          newPasswordErrorStr: MESSAGE.PASSWORD_INVALID
        });
      }
      if (!isValidConfirmPassword && isValidNewPassword) {
        this.setState({
          confirmPasswordError: true,
          confirmPasswordErrorString: MESSAGE.CONFIRMPASSWORD_INVALID
        });
      }
      if (isValidNewPassword && isValidConfirmPassword) {
        this.setState({
          showLoader: true
        });
        Auth.currentAuthenticatedUser()
          .then(user => {
            return Auth.changePassword(user, oldPassword, newPassword);
          })
          .then(data => {
            this.setState({
              showLoader: false
            });
            this.props.history.push(ROUTES_PATH.HOME);
            toast.success(MESSAGE.CHANGE_PASS_SUCCESS, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          })
          .catch(err => {
            if (err.message === "Incorrect username or password.") {
              this.setState({
                error: true,
                responseErrStr: "Please enter correct password.",
                showLoader: false
              });
            } else {
              this.setState({
                error: true,
                responseErrStr: err.message,
                showLoader: false
              });
            }
          });
      }
    }
  };
  render() {
    let {
      showLoader,
      disabled,
      error,
      newPasswordError,
      oldPasswordError,
      responseErrStr,
      OldErrorString,
      newPasswordErrorStr,
      confirmPasswordError,
      confirmPasswordErrorString
    } = this.state;
    return (
      <div className="main-div">
        <div className="inline-flex mt5">
          <div
            className="global-text-style cursor-pointer underline"
            onClick={() => this.props.history.push("/home/providers")}
            // style={{ color: " #4734B8" }}
          >
            Home
          </div>
          <div className="global-text-style">
            <img
              src={CHEVRON_RIGHT_ICON}
              alt=""
              style={{ marginRight: "14px", marginLeft: "14px" }}
            />
            <span style={{ color: "#1f3c73" }}>{MESSAGE.CHANGE_PASSWORD}</span>
          </div>
        </div>
        <Row className="mt5">
          <Col
            lg={{ size: 3 }}
            md={{ size: 4 }}
            className="form-heading-style pt8"
          >
            {MESSAGE.CHANGE_PASSWORD}
          </Col>
        </Row>
        <Row>
          <Col xl={4} lg={6} md={6} sm={12} className="mt30">
            {error && <div className="input-error-style">{responseErrStr}</div>}
            <Label className="global-label-text">{MESSAGE.OLD_PASSWORD}</Label>
            <PasswordField
              {...this.props}
              handlePasswordChange={e =>
                this.handleInputChange(e, "oldpassword")
              }
              className={"page-input-box-style form-control"}
              maxLength={"20"}
              placeholder={"Old password"}
              invalid={false}
            />
            {oldPasswordError && (
              <div className="input-error-style">{OldErrorString}</div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xl={4} lg={6} md={6} sm={12} className="mt10">
            <Label className="global-label-text">{MESSAGE.NEW_PASSWORD}</Label>
            <PasswordField
              {...this.props}
              // handleKeyPress={this.handleKeyPress}
              handlePasswordChange={e =>
                this.handleInputChange(e, "newpassword")
              }
              className={"page-input-box-style form-control"}
              maxLength={"20"}
              placeholder={"New password"}
              invalid={false}
            />
            {newPasswordError && (
              <div className="input-error-style">{newPasswordErrorStr}</div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xl={4} lg={6} md={6} sm={12} className="mt10">
            <Label className="global-label-text">
              {MESSAGE.CONFIRM_PASSWORD}
            </Label>
            <PasswordField
              {...this.props}
              handleKeyPress={this.handleKeyPress}
              handlePasswordChange={e =>
                this.handleInputChange(e, "confirmpassword")
              }
              className={"page-input-box-style form-control"}
              maxLength={"20"}
              placeholder={"Confirm password"}
              invalid={confirmPasswordError}
            />
            {confirmPasswordError && (
              <div className="input-error-style">
                {confirmPasswordErrorString}
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col xl={4} lg={6} md={6} sm={12} className="mt30">
            <ButtonItem
              {...this.props}
              className={"submit-form-button"}
              buttonValue={MESSAGE.CHANGE_PASSWORD}
              handleButtonAction={this.handleChangePassword}
              disabled={disabled}
              showLoader={showLoader}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
