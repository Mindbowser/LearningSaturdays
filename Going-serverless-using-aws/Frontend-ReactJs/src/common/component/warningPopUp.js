import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import PropTypes from "prop-types";
import { BUTTON_SPINNER, MESSAGE } from "../../constants";

const WarningPopUp = ({
  isOpen,
  toggle,
  confirm,
  heading,
  text,
  buttonText,
  cancelBtnText,
  disable,
  showLoader
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className="warning-popup-modal">
        <ModalBody className="warning-modal-body">
          <div className="warning-modal-heading-text"> {heading}</div>
          <div className="warning-modal-detail-text mt-20"> {text}</div>
          <div className="inline-flex ">
            <Button
              className="warning-confirm-button"
              onClick={confirm}
              disabled={disable}
            >
              {" "}
              {showLoader && (
                <img src={BUTTON_SPINNER} height="30px" alt="" />
              )}{" "}
              {buttonText}{" "}
            </Button>
            <div
              className="warning-modal-cancel-btn cursor-pointer"
              onClick={toggle}
            >
              {" "}
              {cancelBtnText}{" "}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

WarningPopUp.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  confirm: PropTypes.func,
  heading: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  disable: PropTypes.bool,
  showLoader: PropTypes.bool
};

WarningPopUp.defaultProps = {
  isOpen: false,
  heading: "",
  text: "",
  buttonText: "",
  placeholder: "",
  cancelBtnText: MESSAGE.CANCEL,
  disable: false,
  showLoader: false
};

export default WarningPopUp;
