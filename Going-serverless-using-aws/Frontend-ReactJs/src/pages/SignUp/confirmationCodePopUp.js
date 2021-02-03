import React from "react";
import { Button, Modal, ModalBody, Input, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { BUTTON_SPINNER, MESSAGE, ROUTES_PATH } from "../../constants";
import { toast } from "react-toastify";
import { validateCode } from "../../utils/validations";
import { Auth } from "aws-amplify";
import { saveToken } from "../../utils/localStorage";
import * as url from "../../utils/urls";
import axios from "../../axios";

class ConfirmationCodePopUp extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    buttonValue: PropTypes.string,
    heading: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    handleSignIn: PropTypes.func
  };

  static defaultProps = {
    isOpen: false,
    buttonValue: "",
    heading: "",
    className: "",
    type: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      code: "",
      codeError: false,
      codeErrorString: "",
      showLoader: false,
      Btndisabled: true
    };
  }

  handleInputChange = (event, type) => {
    let Btndisabled = true;
    if (type === "code") {
      if (event.target.value.length > 2) {
        Btndisabled = false;
      }

      this.setState({
        code: event.target.value,
        codeError: false,
        codeErrorString: "",
        showLoader: false,
        Btndisabled
      });
    }
  };

  handleSubmitBtn = () => {
    let { code } = this.state;

    if (code.length > 2) {
      const isValidatedCode = validateCode(code);

      if (!isValidatedCode) {
        this.setState({
          codeError: true,
          codeErrorString: MESSAGE.CODE_INVALID
        });
      }

      if (isValidatedCode) {
        this.setState({
          showLoader: true
        });

        Auth.confirmSignUp(this.props.userName, code)
          .then(user => {
            console.log(user);
            this.setState({
              showLoader: false
            });
            this.props.toggle();
            this.props.history.push(ROUTES_PATH.LOGIN);
            // if (getAuthType() === "sign-up") {
            //   // toast.success("User signup successful...!", {
            //   //   position: toast.POSITION.BOTTOM_RIGHT
            //   // });
            // }
            // else if (getAuthType() === "sign-in") {
            //   toast.success("User confirmation successful...!", {
            //     position: toast.POSITION.BOTTOM_RIGHT
            //   });
            // }

            // if (this.props.type === "Sign-In") {
            //   this.props.handleSignIn();
            // } else {
            //   this.props.history.push(ROUTES_PATH.SIGN_IN);
            // }
            this.handleSignIn();
          })
          .catch(e => {
            console.log(e);
            this.setState({
              showLoader: false
            });
            // if (getAuthType() !== "sign-up") {
            //   this.props.toggle();
            // }
            // this.props.toggle();
            toast.error(e.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          });
      }
    } else {
      this.setState({ Btndisabled: true });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (!this.state.Btndisabled) {
        this.handleSubmitBtn();
      }
    }
  };

  handleCloseModal = () => {
    this.setState({
      code: "",
      codeError: false,
      codeErrorString: ""
    });
  };
  handleCancelBtn = () => {
    this.setState({
      code: "",
      codeError: false,
      codeErrorString: ""
    });
    this.props.toggle();
  };
  handleSignIn = () => {
    let { userName, password, toggleSignupLoader } = this.props;
    toggleSignupLoader(true);

    Auth.signIn({ username: userName, password })
      .then(user => {
        console.log(user);
        toggleSignupLoader(false);
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

        this.handleSignUpApi();
      })
      .catch(e => {
        console.log(e);
        toggleSignupLoader(false);
        if (e.message === "User does not exist.") {
          toast.error("Incorrect username or password.", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } else if (e.message === "User is not confirmed.") {
          this.handleConfirmationCodeResend();
        } else {
          toast.error(e.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      });
  };

  handleSignUpApi = () => {
    let data = {
      email: this.props.email,
      lastName: this.props.lastName,
      firstName: this.props.firstName,
      dob: this.props.dob
    };
    axios
      .post(url.signUpUrl, data)
      .then(response => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          if (response.data.statusCode === 200) {
            console.log(response.data);
            this.props.toggleSignupLoader(false);
            // if (getAuthType() === "sign-up") {
            //   this.props.history.push(ROUTES_PATH.HOME);
            // }
          }
        }
      })
      .catch(error => {
        this.props.toggleSignupLoader(false);
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
    let { isOpen, toggle, buttonValue, className } = this.props;
    let {
      Btndisabled,
      code,
      codeError,
      codeErrorString,
      showLoader
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        backdrop={false}
        toggle={toggle}
        className={className}
        onClosed={this.handleCloseModal}
      >
        <ModalBody className="form-modal-body">
          {/* <div className="form-modal-heading-text">{heading}</div> */}
          <div className="mt20">
            <FormGroup>
              <Input
                className="page-input-box-style"
                autoComplete={"false"}
                placeholder={"CONFIRMATION CODE *"}
                onChange={e => this.handleInputChange(e, "code")}
                onKeyPress={e => this.handleKeyPress(e)}
                value={code}
                maxLength="100"
                invalid={codeError}
              />
              {codeError && (
                <div className="input-error-style">{codeErrorString}</div>
              )}
            </FormGroup>
          </div>

          <div className="flex-center">
            <Button
              className="warning-confirm-button"
              disabled={Btndisabled || showLoader}
              onClick={() => this.handleSubmitBtn()}
            >
              {showLoader && <img src={BUTTON_SPINNER} alt="" height="25px" />}{" "}
              {buttonValue}
            </Button>
            <div
              className="warning-modal-cancel-btn cursor-pointer"
              onClick={this.handleCancelBtn}
            >
              {`CANCEL`}
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ConfirmationCodePopUp;
