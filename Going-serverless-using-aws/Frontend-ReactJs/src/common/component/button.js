import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { BUTTON_SPINNER } from "../../constants";

// common button component with loader
const ButtonItem = (props) => {
    let {
        className,
        buttonValue,
        handleButtonAction,
        disabled,
        showLoader,
        loaderheight,
        loaderImg
    } = props;
    return (<React.Fragment>
        <Button className={className}
            disabled={
                disabled || showLoader
            }
            onClick={handleButtonAction}> {
                showLoader && (<img src={loaderImg}
                    height={loaderheight}
                    alt="" />)
            }
            {" "}
            {buttonValue} </Button>
    </React.Fragment>);
};

ButtonItem.propTypes = {
    buttonValue: PropTypes.string,
    handleButtonAction: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    showLoader: PropTypes.bool,
    loaderheight: PropTypes.string,
    loaderImg: PropTypes.string
};

ButtonItem.defaultProps = {
    buttonValue: "",
    className: undefined,
    disabled: false,
    showLoader: false,
    loaderheight: "30px",
    loaderImg: BUTTON_SPINNER,

};

export default ButtonItem;
