import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { NEXT_ARROW, PREV_ARROW } from "../../constants";
import { toast } from "react-toastify";
import axios from "../../axios";
import "./common.css";

const Pagination = props => {
  let {
    apiUrl,
    firstIndex,
    lastIndex,
    perPageCount,
    changePaginationNo,
    paginationCurrentNo,
    startLoader,
    stopLoader,
    updatedReducer,
    handlePrevCall,
    isPrev,
    setIsPrev
  } = props;

  const handlePagination = (isForward, index, changePageNo) => {
    if (lastIndex || firstIndex) {
      startLoader();
      document.body.scrollTop = 20;
      document.documentElement.scrollTop = 20;
      axios
        .get(apiUrl + isForward + index)
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            if (response.data.data.length === 0 && isForward === false) {
              toast.warning("Reached to the first page", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
              setIsPrev(false);
              handlePrevCall();
            } else {
              setIsPrev(true);
              stopLoader();
              updatedReducer(response.data);
              changePaginationNo(changePageNo);
            }
          }
        })
        .catch(error => {
          console.log(error);
          toast.error("500 Internal server error", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          stopLoader();
        });
    }
  };
  return (
    <Row className="mt20 text-css">
      <Col
        xs={{ size: "6" }}
        md={{ size: "4", offset: 5 }}
        lg={{ size: "3", offset: 7 }}
        xl={{ size: "2", offset: 8 }}
        style={{ textAlign: "right" }}
      >
        Records on page : {perPageCount}
      </Col>
      <Col xs={{ size: "6" }} md={3} lg={2} xl={2} style={{ padding: "0" }}>
        <img
          src={PREV_ARROW}
          alt="prev"
          className={!isPrev ? "img-inactive" : ""}
          onClick={
            !isPrev
              ? null
              : () =>
                  handlePagination(
                    false,
                    "&firstIndex=" + firstIndex,
                    paginationCurrentNo - 1
                  )
          }
        />
        <span className="text-padding">page {paginationCurrentNo} of more</span>
        <img
          src={NEXT_ARROW}
          alt="next"
          className={lastIndex ? "" : "img-inactive"}
          onClick={
            lastIndex
              ? () =>
                  handlePagination(
                    true,
                    "&lastIndex=" + lastIndex,
                    paginationCurrentNo + 1
                  )
              : null
          }
        />
      </Col>
    </Row>
  );
};

Pagination.propTypes = {
  apiUrl: PropTypes.string,
  firstIndex: PropTypes.string,
  lastIndex: PropTypes.string,
  perPageCount: PropTypes.number,
  paginationCurrentNo: PropTypes.number,
  changePaginationNo: PropTypes.func,
  startLoader: PropTypes.func,
  stopLoader: PropTypes.func,
  updatedReducer: PropTypes.func,
  handlePrevCall: PropTypes.func
};

export default Pagination;
