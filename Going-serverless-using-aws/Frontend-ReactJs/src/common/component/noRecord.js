import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import "./common.css";


const NoRecord = ({ imgUrl, text, className }) => {
    return (
        <Row className="mt50 mb50">
            <Col lg={{ size: 4, offset: 4 }} md={{ size: 4, offset: 4 }}>
                <div className="no-record-div">
                    <img src={imgUrl} alt="" />
                    <div className={"no-record-text"}>{text}</div>
                </div>
            </Col>
        </Row>
    );
};

NoRecord.propTypes = {
    imgUrl: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string
};

NoRecord.defaultProps = {
    imgUrl: null,
    text: "",
    className: undefined
};

export default NoRecord;
