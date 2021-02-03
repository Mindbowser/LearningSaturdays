import React, { Component } from "react";
import ButtonItem from "../../common/component/button";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { LOGO, HUMBERGER_ICON, ROUTES_PATH, MESSAGE } from "../../constants";
import WarningPopUp from "../../common/component/warningPopUp";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../modules/actions";

import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      profileMenuOpen: false,
      isLogoutModalOpen: false,
      showLoader: false,
      isConfirmDisabled: false
    };
  }
  handleLogoutToggle = e => {
    e.preventDefault();
    this.setState({ isLogoutModalOpen: !this.state.isLogoutModalOpen });
  };

  handleLogoutUser = () => {
    this.setState({
      isConfirmDisabled: true,
      showLoader: true
    });
    Auth.signOut({ global: true })
      .then(data => {
        this.props.logoutSuccess();
        this.setState({ isLogoutModalOpen: false, showLoader: true });
        this.props.history.push(ROUTES_PATH.HOME);
      })
      .catch(err => {
        toast.success(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.props.logoutSuccess();
        this.setState({ isLogoutModalOpen: false, showLoader: true });
        this.props.history.push(ROUTES_PATH.HOME);
      });
  };
  render() {
    let { isConfirmDisabled, isLogoutModalOpen, showLoader } = this.state;
    console.log(isLogoutModalOpen);
    return (
      <Row className="mrl-0 height-100vh">
        <WarningPopUp
          heading={MESSAGE.LOGOUT}
          isOpen={isLogoutModalOpen}
          text={MESSAGE.LOGOUT_MESSAGE}
          confirm={this.handleLogoutUser}
          buttonText={"SIGN OUT"}
          toggle={this.handleLogoutToggle}
          disable={isConfirmDisabled}
          showLoader={showLoader}
        />
        {/* <Col xs={12} sm={12} md={6} lg={5} xl={5} className="login-logo-div">
            <LoginLogoComponent className="logo-heading" />
          </Col> */}
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ backgroundColor: "#f5f5f5", alignItems: "center" }}
        >
          <FormGroup
            className="offset-md-4 col-md-4 offset-1 col-10 mt40 mb40"
            style={{ marginTop: "40px", textAlign: "center" }}
          >
            User{" "}
            <span style={{ fontWeight: "600" }}>
              {this.props.user && this.props.user.userName}
            </span>{" "}
            logged in successfully !!!
          </FormGroup>
          <FormGroup
            className="offset-md-4 col-md-4 offset-1 col-10 mt40 mb40"
            style={{ marginTop: "40px" }}
          >
            <ButtonItem
              // {...this.props}
              className={"second-page-button"}
              buttonValue={"CHANGE PASSWORD"}
              handleButtonAction={() => {
                this.props.history.push(ROUTES_PATH.CHANGE_PASSWORD);
              }}
              // disabled={disabled}
              // showLoader={showLoader}
            />
          </FormGroup>
          <FormGroup
            className="offset-md-4 col-md-4 offset-1 col-10 mt40 mb40"
            style={{ marginTop: "40px" }}
          >
            <ButtonItem
              // {...this.props}
              className={"second-page-button"}
              buttonValue={"SIGNOUT"}
              handleButtonAction={this.handleLogoutToggle}
              // disabled={disabled}
              // showLoader={showLoader}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.profile
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutSuccess: ActionCreators.logoutSuccess
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
