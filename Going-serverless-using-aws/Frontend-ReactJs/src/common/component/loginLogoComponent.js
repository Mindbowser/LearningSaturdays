import React from "react";
import PropTypes from "prop-types";
import {LOGO, MESSAGE} from "../../constants";

// added common  component for logo part which is used on login,reset password and forgot password page.
const LoginLogoComponent = (props) => {
    let {className} = props;
    return (<div style={
        {textAlign: "center"}
    }>
        <img src={LOGO}
            alt="logo"
            style={
                {
                    height: "120px",
                    width: "300px"
                }
            }/>

        <div className={className}> {
            MESSAGE.WELCOME_LABEL
        }</div>
    </div>);
};

LoginLogoComponent.propTypes = {
    className: PropTypes.string
};

LoginLogoComponent.defaultProps = {};

export default LoginLogoComponent;
