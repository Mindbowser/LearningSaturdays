import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { BUTTON_SPINNER } from "../../constants";
import { CSVLink } from "react-csv";

// common download csv file button
const DownloadCSV = props => {
  let {
    className,
    buttonValue,
    handleButtonAction,
    disabled,
    showLoader,
    loaderheight,
    data,
    csvFileName,
    refLink,
    loaderImg
  } = props;

  return (
    <React.Fragment>
      <Button
        className={className}
        disabled={disabled || showLoader}
        onClick={handleButtonAction}
      >
        {showLoader && <img src={loaderImg} height={loaderheight} alt="" />}{" "}
        {buttonValue}{" "}
      </Button>
      {data && (
        <CSVLink
          data={data}
          filename={csvFileName + ".csv"}
          className="hidden"
          ref={refLink}
          target="_self"
        />
      )}
    </React.Fragment>
  );
};

DownloadCSV.propTypes = {
  buttonValue: PropTypes.string,
  handleButtonAction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  showLoader: PropTypes.bool,
  loaderheight: PropTypes.string,
  data: PropTypes.array,
  csvFileName: PropTypes.string,
  refLink: PropTypes.object,
  loaderImg: PropTypes.string
};

DownloadCSV.defaultProps = {
  buttonValue: "",
  className: undefined,
  disabled: false,
  showLoader: false,
  loaderheight: "30px",
  loaderImg: BUTTON_SPINNER
};

export default DownloadCSV;
