import React from "react";
import PropTypes from "prop-types";
import { Button, Input } from "reactstrap";
import { BUTTON_SPINNER } from "../../constants";

// common upload csv file button
const UploadCSV = props => {
  let {
    className,
    buttonValue,
    disabled,
    showLoader,
    loaderheight,
    handleFileUpload,
    loaderImg
  } = props;

  const handleButtonClick = () => {
    document.getElementById("csvSelector").click();
  };

  return (
    <React.Fragment>
      <Button
        className={className}
        disabled={disabled || showLoader}
        onClick={handleButtonClick}
      >
        {showLoader && <img src={loaderImg} height={loaderheight} alt="" />}{" "}
        {buttonValue}{" "}
      </Button>
      <Input
        id="csvSelector"
        type="file"
        hidden
        onChange={e => handleFileUpload(e)}
        accept=".csv"
      />
    </React.Fragment>
  );
};

UploadCSV.propTypes = {
  buttonValue: PropTypes.string,
  handleButtonAction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  showLoader: PropTypes.bool,
  loaderheight: PropTypes.string,
  data: PropTypes.array,
  csvFileName: PropTypes.string,
  refLink: PropTypes.object,
  loaderImg: PropTypes.string,
  handleFileUpload: PropTypes.func
};

UploadCSV.defaultProps = {
  buttonValue: "",
  className: undefined,
  disabled: false,
  showLoader: false,
  loaderheight: "30px",
  loaderImg: BUTTON_SPINNER
};

export default UploadCSV;
