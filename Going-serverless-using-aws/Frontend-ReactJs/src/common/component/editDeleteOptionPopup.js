import React from "react";
import { MORE_ICON } from "../../constants";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import PropTypes from "prop-types";
import "./common.css";

// common edit delete popup
const EditDeleteOptionPopup = ({
  toggleDeleteModal,
  handleEditBtn,
  handlePatientDownload,
  optionName
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        className="p0 more-dropdown-custom-btn"
        onClick={e => e.stopPropagation()}
      >
        <img src={MORE_ICON} alt="" width="20px" height="20px" />
      </DropdownToggle>
      <DropdownMenu
        right
        className="provider-more-menu-action p0"
        onClick={e => e.stopPropagation()}
      >
        <DropdownItem className="more-dropdown-item" onClick={handleEditBtn}>
          Edit
        </DropdownItem>
        <DropdownItem
          className="more-dropdown-item"
          onClick={toggleDeleteModal}
        >
          Delete
        </DropdownItem>
        <DropdownItem
          className="more-dropdown-item"
          onClick={handlePatientDownload}
        >
          {optionName}
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

EditDeleteOptionPopup.propTypes = {
  toggleDeleteModal: PropTypes.func,
  handleEditBtn: PropTypes.func,
  handlePatientDownload: PropTypes.func
};

EditDeleteOptionPopup.defaultProps = {};

export default EditDeleteOptionPopup;
