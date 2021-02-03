import React, {useState} from "react";
import {EYE_OFF, EYE_OPEN} from "../../constants/image";
import PropTypes from "prop-types";

// common component for password field
const PasswordField = (props) => {
    let {
        handlePasswordChange,
        handleKeyPress,
        className,
        maxLength,
        placeholder,
        invalid
    } = props;
    const [showPassword, togglePassword] = useState(false);

    const toggle = () => togglePassword((prevState) => !prevState);
    return (<React.Fragment>
        <input type={
                showPassword ? "text" : "password"
            }
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className={className}
            maxLength={maxLength}
            autoComplete={"false"}
            id={
                invalid ? "invalid-input-border" : ""
            }/>
        <span onClick={toggle}
            className="field-icon cursor-pointer">
            <img src={
                    showPassword ? EYE_OFF : EYE_OPEN
                }
                alt=" "
                width="25px"
                height="20px"
                className="cursor-pointer"/>
        </span>
    </React.Fragment>);
};

PasswordField.propTypes = {
    handlePasswordChange: PropTypes.func,
    handleKeyPress: PropTypes.func,
    className: PropTypes.string,
    maxLength: PropTypes.string,
    placeholder: PropTypes.string,
    invalid: PropTypes.bool
};

PasswordField.defaultProps = {
    type: "text",
    className: undefined,
    leftIcon: undefined,
    inputRef: undefined,
    placeholder: "",
    invalid: false,
    handleKeyPress: () => {
        console.log("Key");
    }
};

export default PasswordField;
