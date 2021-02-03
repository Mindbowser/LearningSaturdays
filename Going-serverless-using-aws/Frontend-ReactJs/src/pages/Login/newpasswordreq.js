import React, { Component } from "react";
import { Row, Col, FormGroup, Label } from "reactstrap";
import {
  passwordValidation,
  validateConfirmPassword
} from "../../utils/validations";
import ButtonItem from "../../common/component/button";
import LoginLogoComponent from "../../common/component/loginLogoComponent";
import { MESSAGE, ROUTES_PATH } from "../../constants";
import PasswordField from "../../common/component/passwordField";
import { connect } from "react-redux";
import { saveToken } from "../../utils/localStorage";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../modules/actions";
import "../Login/login.css";
import Auth from "@aws-amplify/auth";
import { toast } from "react-toastify";

class NewPasswordReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      newPassword: "",
      confirmPassword: "",
      newPasswordError: false,
      newPasswordErrorString: "",
      confirmPasswordError: false,
      confirmPasswordErrorString: "",
      isSentrequestSuccess: false,
      showLoader: false
    };
  }

  handleInputChange = (event, inputType) => {
    let disabled = true;
    if (inputType === "newpassword") {
      if (
        this.state.confirmPassword.length > 5 &&
        event.target.value.length > 5
      ) {
        disabled = false;
      }
      this.setState({
        newPassword: event.target.value,
        newPasswordError: false,
        newPasswordErrorStr: "",
        disabled
      });
    } else {
      if (this.state.newPassword.length > 5 && event.target.value.length > 5) {
        disabled = false;
      }
      this.setState({
        confirmPassword: event.target.value,
        confirmPasswordError: false,
        confirmErrorStr: "",
        disabled
      });
    }
  };

  handleResetPassword = () => {
    let { newPassword, confirmPassword } = this.state;
    let { userDetails } = this.props;

    if (newPassword.length > 5 && confirmPassword.length > 5) {
      const isValidNewPassword = passwordValidation(newPassword);
      const isValidConfirmPassword = validateConfirmPassword(
        newPassword,
        confirmPassword
      );
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
      if (isValidNewPassword && isValidConfirmPassword) {
        this.setState({
          showLoader: true
        });

        Auth.completeNewPassword(
          userDetails, // the Cognito User Object
          newPassword, // the new password
          // // OPTIONAL, the required attributes
          {
            name: userDetails.username
          }
        )
          .then(user => {
            saveToken(
              user.signInUserSession.accessToken.jwtToken,
              user.signInUserSession.refreshToken.token,
              user.signInUserSession.idToken.jwtToken
            );
            this.props.loginSuccess({
              userName: user.username,
              attributes: user.challengeParam.userAttributes,
              accessToken: user.signInUserSession.accessToken,
              idToken: user.signInUserSession.idToken,
              refreshToken: user.signInUserSession.refreshToken
            });
            this.props.history.push(ROUTES_PATH.HOME);
          })
          .catch(e => {
            console.log(e);
            this.setState({
              showLoader: false
            });
            toast.error(e.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          });
      }
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (this.state.userName.length >= 5) {
        this.handleResetPassword();
      }
    }
  };

  render() {
    let {
      disabled,
      newPassword,
      newPasswordError,
      newPasswordErrorString,
      confirmPassword,
      confirmPasswordError,
      confirmPasswordErrorString,
      showLoader
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
            <div className="row">
              <FormGroup className="offset-md-2 col-md-8 offset-1 col-10">
                <div className="title">{MESSAGE.CHANGE_PASSWORD}</div>
                <div className="mb-20">{MESSAGE.CHANGE_PASSWORD_LABEL}</div>
              </FormGroup>
              <FormGroup className="offset-md-2 col-md-8 offset-1 col-10">
                <Label className="global-label-text">
                  {MESSAGE.NEW_PASSWORD}
                </Label>
                <PasswordField
                  {...this.props}
                  // handleKeyPress={this.handleKeyPress}
                  handlePasswordChange={e =>
                    this.handleInputChange(e, "newpassword")
                  }
                  value={newPassword}
                  className={"page-input-box-style form-control"}
                  maxLength={"20"}
                  placeholder={MESSAGE.NEW_PASSWORD_PLACEHOLDER}
                  invalid={newPasswordError}
                />
                {newPasswordError && (
                  <div className="input-error-style">
                    {newPasswordErrorString}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="offset-md-2 col-md-8 offset-1 col-10">
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
              <FormGroup className="offset-md-2 col-md-8 offset-2 col-8">
                <ButtonItem
                  {...this.props}
                  className={"submit-form-button"}
                  buttonValue={"RESET PASSWORD"}
                  handleButtonAction={this.handleResetPassword}
                  disabled={disabled}
                  showLoader={showLoader}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordReq);
