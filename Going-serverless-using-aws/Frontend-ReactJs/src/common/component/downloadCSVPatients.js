import React from "react";
import PropTypes from "prop-types";
import { BUTTON_SPINNER } from "../../constants";
import { CSVLink } from "react-csv";

// common download csv file button
const DownloadCSVPatients = props => {
  let { data, csvFileName, refLink } = props;

  return (
    <React.Fragment>
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

DownloadCSVPatients.propTypes = {
  data: PropTypes.array,
  csvFileName: PropTypes.string,
  refLink: PropTypes.object
};

export default DownloadCSVPatients;
